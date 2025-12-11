import { supabase, ForgeDocument } from '../lib/supabaseClient';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

/**
 * Generate embedding using OpenRouter's OpenAI embedding model
 */
async function generateEmbedding(text: string): Promise<number[] | null> {
    if (!OPENROUTER_API_KEY) {
        console.warn('OpenRouter API key not found for embeddings');
        return null;
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
                'X-Title': 'Fantasy Forge Calculator',
            },
            body: JSON.stringify({
                model: 'openai/text-embedding-ada-002',
                input: text.substring(0, 8000), // Token limit safety
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Embedding API error:', error);
            return null;
        }

        const data = await response.json();
        return data.data?.[0]?.embedding || null;
    } catch (error) {
        console.error('Failed to generate embedding:', error);
        return null;
    }
}

/**
 * Search for similar documents using vector similarity
 */
export async function searchVectorDocuments(
    query: string,
    threshold = 0.65,
    limit = 5
): Promise<ForgeDocument[]> {
    if (!supabase) {
        console.warn('Supabase not configured, skipping vector search');
        return [];
    }

    const embedding = await generateEmbedding(query);

    if (!embedding) {
        console.warn('Failed to generate embedding for query');
        return [];
    }

    try {
        const { data, error } = await supabase.rpc('match_forge_documents', {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: limit,
        });

        if (error) {
            console.error('Vector search error:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Vector search failed:', error);
        return [];
    }
}

/**
 * Format vector search results for AI context
 */
export function formatVectorContext(documents: ForgeDocument[]): string {
    if (documents.length === 0) {
        return "No relevant information found in the knowledge base.";
    }

    return documents.map((doc, index) => {
        let context = `[${index + 1}] **${doc.name}** (${doc.type})\n`;
        context += doc.content;
        if (doc.similarity) {
            context += `\n📊 Relevance: ${(doc.similarity * 100).toFixed(1)}%`;
        }
        return context;
    }).join('\n\n---\n\n');
}

/**
 * Check if vector search is available
 */
export function isVectorSearchAvailable(): boolean {
    return !!supabase && !!OPENROUTER_API_KEY;
}
