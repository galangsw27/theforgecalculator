import ores from '../data/ores.json';
import weapons from '../data/weapons.json';
import armor from '../data/armor.json';
import enemies from '../data/enemies.json';
import races from '../data/races.json';
import pickaxes from '../data/pickaxes.json';
import runes from '../data/runes.json';
import items from '../data/items.json';
import locations from '../data/locations.json';
import mechanics from '../data/mechanics.json';
import guides from '../data/guides.json';
import codes from '../data/codes.json';

// Combine all data into a single searchable array
const ALL_DATA = [
    ...ores.map(i => ({ ...i, type: 'Ore' })),
    ...weapons.map(i => ({ ...i, type: 'Weapon' })),
    ...armor.map(i => ({ ...i, type: 'Armor' })),
    ...enemies.map(i => ({ ...i, type: 'Enemy' })),
    ...races.map(i => ({ ...i, type: 'Race' })),
    ...pickaxes.map(i => ({ ...i, type: 'Pickaxe' })),
    ...runes.map(i => ({ ...i, type: 'Rune' })),
    ...items.map(i => ({ ...i, type: 'Item' })),
    ...locations.map(i => ({ ...i, type: 'Location' })),
    ...mechanics.map(i => ({ ...i, type: 'Mechanic' })),
    ...guides.map(i => ({ ...i, type: 'Guide' })),
    ...codes.map(i => ({ ...i, type: 'Code' })),
];

export interface SearchResult {
    name: string;
    type: string;
    description?: string;
    url?: string;
    [key: string]: any;
}

export function searchKnowledgeBase(query: string): SearchResult[] {
    if (!query) return [];

    const lowerQuery = query.toLowerCase().replace(/[?.,!]/g, '');
    const tokens = lowerQuery.split(/\s+/).filter(t => t.length > 1);

    // Synonym Mapping
    const synonyms: { [key: string]: string[] } = {
        'armor': ['baju', 'zirah', 'pakaian', 'rompi'],
        'weapon': ['senjata', 'pedang', 'tombak', 'panah', 'bow', 'sword'],
        'enemy': ['musuh', 'lawan', 'monster', 'boss', 'raja'],
        'location': ['dimana', 'lokasi', 'tempat', 'daerah', 'area', 'spot'],
        'ore': ['batu', 'tambang', 'mineral', 'mining'],
        'drop': ['dapat', 'hasil', 'loot', 'jatuh'],
        'mechanic': ['cara', 'mekanik', 'sistem', 'tutorial']
    };

    // Check for intent based on synonyms
    const isAskingLocation = tokens.some(t => synonyms['location'].includes(t) || t === 'location');
    const isAskingEnemy = tokens.some(t => synonyms['enemy'].includes(t) || t === 'enemy');
    const isAskingWeapon = tokens.some(t => synonyms['weapon'].includes(t) || t === 'weapon');
    const isAskingOre = tokens.some(t => synonyms['ore'].includes(t) || t === 'ore');
    const isAskingArmor = tokens.some(t => synonyms['armor'].includes(t) || t === 'armor');

    // Calculate score for each item
    const scoredItems = ALL_DATA.map(item => {
        let score = 0;
        const itemString = JSON.stringify(item).toLowerCase();
        const itemName = item.name?.toLowerCase() || '';
        const itemType = item.type?.toLowerCase() || '';

        // 1. Exact Name Match (Highest Priority)
        if (itemName === lowerQuery) score += 100;
        else if (itemName.includes(lowerQuery)) score += 50;

        // 2. Token Matching
        tokens.forEach(token => {
            if (itemName.includes(token)) score += 20; // Name match
            else if (itemString.includes(token)) score += 5; // General match
        });

        // 3. Contextual Boosting
        if (isAskingLocation && (item['Area'] || item['Location'] || itemType === 'location')) score += 20;
        if (isAskingEnemy && itemType === 'enemy') score += 20;
        if (isAskingWeapon && itemType === 'weapon') score += 20;
        if (isAskingOre && itemType === 'ore') score += 20;
        if (isAskingArmor && itemType === 'armor') score += 20;

        // Boost if the item name is one of the tokens
        if (tokens.some(t => itemName === t)) score += 30;

        return { item, score };
    });

    // Filter and Sort
    const results = scoredItems
        .filter(r => r.score > 10) // Increased threshold to reduce noise
        .sort((a, b) => b.score - a.score)
        .map(r => r.item);

    console.log(`Search Query: "${query}"`);
    console.log(`Top Results:`, results.slice(0, 3).map(i => i.name));

    return results.slice(0, 5); // Reduced limit to keep context focused
}

export function formatContext(results: SearchResult[]): string {
    if (results.length === 0) return "No specific data found in the knowledge base.";

    return results.map(item => {
        let details = `Name: ${item.name} (${item.type})\n`;
        if (item.description) details += `Description: ${item.description}\n`;

        // Add other relevant fields dynamically
        Object.entries(item).forEach(([key, value]) => {
            if (!['name', 'type', 'description', 'url', 'image'].includes(key) && typeof value !== 'object') {
                details += `${key}: ${value}\n`;
            }
        });

        return details;
    }).join('\n---\n');
}
