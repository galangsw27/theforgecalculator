/**
 * Script to upload all wiki data to Supabase with vector embeddings
 * 
 * Run with: npx tsx scripts/uploadEmbeddings.ts
 * 
 * Required environment variables:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - OPENROUTER_API_KEY
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment from .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const OPENROUTER_API_KEY = process.env.VITE_OPENROUTER_API_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENROUTER_API_KEY) {
    console.error('❌ Missing required environment variables!');
    console.error('Please ensure .env.local contains:');
    console.error('  - VITE_SUPABASE_URL');
    console.error('  - SUPABASE_SERVICE_ROLE_KEY');
    console.error('  - VITE_OPENROUTER_API_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Data files to process
const dataFiles = [
    { file: 'ores.json', type: 'Ore' },
    { file: 'weapons.json', type: 'Weapon' },
    { file: 'armor.json', type: 'Armor' },
    { file: 'enemies.json', type: 'Enemy' },
    { file: 'races.json', type: 'Race' },
    { file: 'pickaxes.json', type: 'Pickaxe' },
    { file: 'runes.json', type: 'Rune' },
    { file: 'items.json', type: 'Item' },
    { file: 'locations.json', type: 'Location' },
    { file: 'mechanics.json', type: 'Mechanic' },
    { file: 'guides.json', type: 'Guide' },
    { file: 'codes.json', type: 'Code' },
    { file: 'achievements.json', type: 'Achievement' },
    { file: 'story.json', type: 'Story' },
    { file: 'npcs.json', type: 'NPC' },
];

/**
 * Generate embedding using OpenRouter
 */
async function generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost',
            'X-Title': 'Fantasy Forge Calculator Upload',
        },
        body: JSON.stringify({
            model: 'openai/text-embedding-ada-002',
            input: text.substring(0, 8000),
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Embedding API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
}

/**
 * Create rich text content from item data
 */
function createDocumentContent(item: any, type: string): string {
    const parts: string[] = [];

    parts.push(`Name: ${item.name}`);
    parts.push(`Type: ${type}`);

    if (item.description) {
        parts.push(`Description: ${item.description}`);
    }

    // Add all other relevant fields
    const skipKeys = ['name', 'description', 'url', 'image', 'Image'];
    Object.entries(item).forEach(([key, value]) => {
        if (!skipKeys.includes(key) && value !== undefined && value !== null && value !== '') {
            if (typeof value === 'object') {
                parts.push(`${key}: ${JSON.stringify(value)}`);
            } else {
                parts.push(`${key}: ${value}`);
            }
        }
    });

    return parts.join('\n');
}

/**
 * Sleep helper for rate limiting
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main upload function
 */
async function uploadData() {
    console.log('🚀 Starting embedding upload to Supabase...\n');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    const { error: deleteError } = await supabase.from('forge_documents').delete().neq('id', 0);

    if (deleteError) {
        console.warn('⚠️ Warning: Could not clear data (table might be empty or ID mismatch):', deleteError.message);
    } else {
        console.log('✅ Existing data cleared.');
    }

    let totalUploaded = 0;
    let totalErrors = 0;

    for (const { file, type } of dataFiles) {
        const filePath = path.join(__dirname, '../src/data', file);

        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Skipping ${file} (not found)`);
            continue;
        }

        const items = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (!Array.isArray(items) || items.length === 0) {
            console.log(`⚠️  Skipping ${file} (empty or invalid)`);
            continue;
        }

        console.log(`📁 Processing ${file}: ${items.length} items`);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (!item.name) {
                console.log(`  ⚠️  Skipping item without name at index ${i}`);
                continue;
            }

            try {
                const content = createDocumentContent(item, type);

                // Generate embedding
                const embedding = await generateEmbedding(content);

                // Upload to Supabase
                const { error } = await supabase.from('forge_documents').insert({
                    name: item.name,
                    type: type,
                    content: content,
                    metadata: item,
                    embedding: embedding,
                });

                if (error) {
                    console.error(`  ❌ Error uploading ${item.name}:`, error.message);
                    totalErrors++;
                } else {
                    console.log(`  ✅ ${item.name}`);
                    totalUploaded++;
                }

                // Rate limit: 100ms between requests
                await sleep(150);

            } catch (error: any) {
                console.error(`  ❌ Failed ${item.name}:`, error.message);
                totalErrors++;

                // Back off on errors
                await sleep(1000);
            }
        }

        console.log('');
    }

    console.log('━'.repeat(50));
    console.log(`✨ Upload complete!`);
    console.log(`   ✅ Uploaded: ${totalUploaded}`);
    console.log(`   ❌ Errors: ${totalErrors}`);
}

// Run the upload
uploadData().catch(console.error);
