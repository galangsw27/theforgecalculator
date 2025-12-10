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
    const tokens = lowerQuery.split(/\s+/).filter(t => t.length > 1); // Allow 2 char words like "HP"

    // Keyword mappings for boosting
    const isAskingLocation = tokens.some(t => ['dimana', 'lokasi', 'tempat', 'where', 'location'].includes(t));
    const isAskingEnemy = tokens.some(t => ['musuh', 'lawan', 'enemy', 'enemies', 'monster'].includes(t));
    const isAskingWeapon = tokens.some(t => ['senjata', 'pedang', 'weapon', 'sword', 'bow'].includes(t));
    const isAskingOre = tokens.some(t => ['ore', 'batu', 'tambang', 'mining'].includes(t));
    const isAskingDrop = tokens.some(t => ['dapat', 'drop', 'loot', 'hasil'].includes(t));

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
        if (isAskingLocation && (item['Area'] || item['Location'])) score += 15;
        if (isAskingEnemy && itemType === 'enemy') score += 15;
        if (isAskingWeapon && itemType === 'weapon') score += 15;
        if (isAskingOre && itemType === 'ore') score += 15;

        // Boost if the item name is one of the tokens (e.g. "Bomber" in "dimana bomber")
        if (tokens.some(t => itemName === t)) score += 30;

        return { item, score };
    });

    // Filter and Sort
    const results = scoredItems
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.item);

    console.log(`Search Query: "${query}"`);
    console.log(`Top Results:`, results.slice(0, 3).map(i => i.name));

    return results.slice(0, 8);
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
