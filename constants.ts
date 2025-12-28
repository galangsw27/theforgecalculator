import { Ore, ItemStat } from './types';

export const ORE_DATA: Ore[] = [
    // Stonewake's Cross
    { id: 1, name: "Stone", multiplier: 0.2, rarity: "common", area: "stonewake", color: "#7b7773", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/stone-the-forge-calculator.png", description: "It's a rock. What more do you want?", dropChance: "1/1", price: 3 },
    { id: 2, name: "Sand Stone", multiplier: 0.25, rarity: "common", area: "stonewake", color: "#c3a777", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/sand-stone-the-forge-calculator.png", description: "Crumbly yet sturdy enough to build with. Not great with water.", dropChance: "1/2", price: 3.75 },
    { id: 3, name: "Copper", multiplier: 0.3, rarity: "common", area: "stonewake", color: "#925d3e", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/copper-the-forge-calculator.png", description: "Basic but dependable. A beginner's best friend in the forge.", dropChance: "1/3", price: 4.5 },
    { id: 4, name: "Iron", multiplier: 0.35, rarity: "common", area: "stonewake", color: "#827356", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/iron-the-forge-calculator.png", description: "The workhorse of the forge. Reliable, versatile and a classic choice.", dropChance: "1/5", price: 5.25 },
    { id: 5, name: "Tin", multiplier: 0.425, rarity: "uncommon", area: "stonewake", color: "#69707b", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/tin-the-forge-calculator.png", description: "Weak on its own, but blends beautifully with others.", dropChance: "1/7", price: 6.38 },
    { id: 6, name: "Silver", multiplier: 0.5, rarity: "uncommon", area: "stonewake", color: "#bad0e0", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/silver-the-forge-calculator.png", description: "Malleable and pure. Naturally anti-curse, anti-werewolf, anti-everything-bad.", dropChance: "1/12", price: 7.5 },
    { id: 7, name: "Gold", multiplier: 0.65, rarity: "uncommon", area: "stonewake", color: "#c89d40", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/gold-the-forge-calculator.png", description: "Not the strongest, but hey–it's gold. Fancy never goes out of style.", dropChance: "1/16", price: 19.5 },
    { id: 8, name: "Mushroomite", multiplier: 0.8, rarity: "rare", area: "stonewake", color: "#9b8768", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/mushroomite-the-forge-calculator.png", description: "Grows in damp places. Sometimes glows. Sometimes talks. Probably fine.", dropChance: "1/22", price: 12 },
    { id: 9, name: "Platinum", multiplier: 0.8, rarity: "rare", area: "stonewake", color: "#d6dee6", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/platinum-the-forge-calculator.png", description: "Smooth, silvery, and highly conductive. Rare and sought-after.", dropChance: "1/28", price: 12 },
    { id: 10, name: "Bananite", multiplier: 0.85, rarity: "uncommon", area: "stonewake", color: "#edbe70", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/bananite-the-forge-calculator.png", description: "Yellow, slippery, looks and smells like banana yet surprisingly durable.", dropChance: "1/30", price: 12.75 },
    { id: 11, name: "Cardboardite", multiplier: 0.7, rarity: "common", area: "stonewake", color: "#a28161", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/carboardite-the-forge-calculator.png", description: "Looks like trash, feels like trash... but somehow incredibly useful.", dropChance: "1/31", price: 10.5 },
    { id: 12, name: "Aite", multiplier: 1.0, rarity: "epic", area: "stonewake", color: "#f0d2a7", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/aite-the-forge-calculator.png", description: "It's an ore made out of A's – but actually lightweight and razor sharp.", dropChance: "1/44", price: 16.5 },
    {
        id: 13, name: "Poopite", multiplier: 1.2, rarity: "epic", area: "stonewake", color: "#5f4937", traitType: "all", traits: [
            { description: "15% poison for 5s when below 35% HP", scaling: { damage: { min: 1.5, max: 15 }, duration: { min: 0.5, max: 5 } }, type: "all" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/poopite-the-forge-calculator.png",
        description: "Ew. Why is this even mineable?",
        dropChance: "1/131",
        price: 18
    },
    { id: 43, name: "Fichillium", multiplier: 0, rarity: "relic", area: "stonewake", color: "#000000", traitType: null, traits: [], description: "PLAY ABYSS!", dropChance: "1/1", price: 0 },

    // Forgotten Kingdom
    { id: 14, name: "Cobalt", multiplier: 1.0, rarity: "uncommon", area: "kingdom", color: "#579de7", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/cobalt-the-forge-calculator.png", description: "A sturdy bluish metal known for its resilience and sharp edges.", dropChance: "1/37", price: 15 },
    { id: 15, name: "Titanium", multiplier: 1.15, rarity: "uncommon", area: "kingdom", color: "#aca895", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/titanium-the-forge-calculator.png", description: "One of the strongest metals. Lightweight, almost unbreakable.", dropChance: "1/50", price: 17.25 },
    { id: 17, name: "Lapis Lazuli", multiplier: 1.3, rarity: "uncommon", area: "kingdom", color: "#5c89dc", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/lapis-lazuli-the-forge-calculator.png", description: "Deep blue with ancient markings. Scholars say it stores memories.", dropChance: "1/73", price: 22.5 },
    { id: 44, name: "Boneite", multiplier: 1.2, rarity: "rare", area: "kingdom", color: "#e3e3e3", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/boneite-the-forge.jpg", description: "A pale, brittle ore formed from shattered skeleton remains, still carrying faint undead energy.", dropChance: "1/222", price: 18 },
    { id: 16, name: "Volcanic Rock", multiplier: 1.55, rarity: "rare", area: "kingdom", color: "#504b44", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/volcanic-rock-the-forge-calculator.png", description: "It's not a just a rock. What more do you want?", dropChance: "1/55", price: 23.25 },
    { id: 18, name: "Quartz", multiplier: 1.5, rarity: "rare", area: "kingdom", color: "#b6dffd", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/quartz-the-forge-calculator.png", description: "Translucent and mystical. Often used to amplify rune energy.", dropChance: "1/90", price: 22.5 },
    { id: 19, name: "Amethyst", multiplier: 1.65, rarity: "rare", area: "kingdom", color: "#957aed", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/amethyst-the-forge-calculator.png", description: "A shimmering purple gem, pulsing with magical energy.", dropChance: "1/115", price: 24.75 },
    { id: 20, name: "Topaz", multiplier: 1.75, rarity: "rare", area: "kingdom", color: "#deb7a4", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/topaz-the-forge-calculator.png", description: "Golden yellow and warm. Used in enchanting precision tools.", dropChance: "1/143", price: 26.25 },
    { id: 21, name: "Diamond", multiplier: 2.0, rarity: "rare", area: "kingdom", color: "#aef8fa", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/diamond-the-forge-calculator.png", description: "The hardest known material.", dropChance: "1/192", price: 30 },
    { id: 45, name: "Dark boneite", multiplier: 2.25, rarity: "rare", area: "kingdom", color: "#2b2b2b", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/dark-boneite-the-forge.jpg", description: "A pale, brittle ore formed from shattered skeleton remains, still carrying faint undead energy", dropChance: "1/555", price: 33.75 },
    { id: 22, name: "Sapphire", multiplier: 2.25, rarity: "rare", area: "kingdom", color: "#7bbdfa", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/sapphire-the-forge-calculator.png", description: "Deep blue and ice-cold. Sold to sharpen senses when worn.", dropChance: "1/247", price: 33.75 },
    { id: 23, name: "Cuprite", multiplier: 2.43, rarity: "epic", area: "kingdom", color: "#7a3034", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/cuprite-the-forge-calculator.png", description: "A bright red metallic ore found near river rocks.", dropChance: "1/303", price: 36.45 },
    {
        id: 24, name: "Obsidian", multiplier: 2.35, rarity: "epic", area: "kingdom", color: "#4b2e87", traitType: "armor", traits: [
            { description: "30% extra defense on Armor", scaling: { health: { min: 3, max: 30 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/obsidian-the-forge-calculator.png",
        description: "Volcanic glass as sharp as it is strong.",
        dropChance: "1/333",
        price: 35.25
    },
    { id: 25, name: "Emerald", multiplier: 2.55, rarity: "epic", area: "kingdom", color: "#5fb172", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/emerald-the-forge-calculator.png", description: "Vivid green and unnaturally smooth.", dropChance: "1/363", price: 38.25 },
    { id: 26, name: "Ruby", multiplier: 2.95, rarity: "epic", area: "kingdom", color: "#cc4a53", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/ruby-the-forge-calculator.png", description: "A blood-red gem that gleams with fury.", dropChance: "1/487", price: 44.25 },
    {
        id: 27, name: "Rivalite", multiplier: 3.33, rarity: "epic", area: "kingdom", color: "#8e4a4c", traitType: "weapon", traits: [
            { description: "+20% crit chance on Weapons", scaling: { crit: { min: 2, max: 20 } }, type: "weapon" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/rivalite-the-forge-calculator.png",
        description: "A reactive ore that strengthens when near other powerful metals.",
        dropChance: "1/569",
        price: 49.95
    },
    { id: 46, name: "Slimite", multiplier: 2.25, rarity: "epic", area: "kingdom", color: "#66ff66", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/slimite-the-forge.jpg", description: "A slime-like ore that wiggles, and leaves a faint slime glow.", dropChance: "1/247", price: 33.75 },
    {
        id: 28, name: "Uranium", multiplier: 3.0, rarity: "legendary", area: "kingdom", color: "#97c889", traitType: "armor", traits: [
            { description: "5% max HP AOE dmg on Armor", scaling: { damage: { min: 0.5, max: 5 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/uranium-the-forge-calculator.png",
        description: "Dangerous, unstable, and glowing green.",
        dropChance: "1/777",
        price: 66
    },
    {
        id: 29, name: "Mythril", multiplier: 3.5, rarity: "legendary", area: "kingdom", color: "#9f61fa", traitType: "armor", traits: [
            { description: "15% extra defense on Armor", scaling: { health: { min: 1.5, max: 15 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/mythril-the-forge-calculator.png",
        description: "Lightweight and insanely durable.",
        dropChance: "1/813",
        price: 52.5
    },
    {
        id: 30, name: "Eye Ore", multiplier: 4.0, rarity: "legendary", area: "kingdom", color: "#fab67f", traitType: "all", traits: [
            { description: "-10% HP, +15% dmg on Weapons/Armor", scaling: { damage: { min: 1.5, max: 15 }, health: { min: 1, max: 10 } }, type: "all" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/eye-ore-the-forge-calculator.png",
        description: "A strange ore with a blinking core.",
        dropChance: "1/1333",
        price: 37.5
    },
    {
        id: 31, name: "Fireite", multiplier: 4.5, rarity: "legendary", area: "kingdom", color: "#a4532e", traitType: "weapon", traits: [
            { description: "20% burn chance on Weapons", scaling: { damage: { min: 2, max: 20 } }, type: "weapon" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/fireite-the-forge-calculator.png",
        description: "A red-hot ore that crackles with inner flames.",
        dropChance: "1/2187",
        price: 67.5
    },
    {
        id: 32, name: "Magmaite", multiplier: 5.0, rarity: "legendary", area: "kingdom", color: "#f77b61", traitType: "weapon", traits: [
            { description: "50.00% of weapon dmg as AOE Explosion with 35.00% chance on weapons", scaling: { damage: { min: 5, max: 50 } }, type: "weapon" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/magmaite-the-forge-calculator.png",
        description: "A volatile ore bubbling with veins.",
        dropChance: "1/3003",
        price: 75
    },
    {
        id: 33, name: "Lightite", multiplier: 4.6, rarity: "legendary", area: "kingdom", color: "#9ac9fa", traitType: "armor", traits: [
            { description: "15% extra movement speed on Armor", scaling: { speed: { min: 1.5, max: 15 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/lightite-the-forge-calculator.png",
        description: "So bright it almost floats.",
        dropChance: "1/3333",
        price: 69
    },
    {
        id: 34, name: "Demonite", multiplier: 5.5, rarity: "mythical", area: "kingdom", color: "#7d1b1d", traitType: "armor", traits: [
            { description: "25.00% to Burn Enemy when Damage is Taken. On Armor.", scaling: { damage: { min: 2, max: 20 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/demonite-the-forge-calculator.png",
        description: "A dark, heat-pulsing ore that leaks dark red sparks.",
        dropChance: "1/3666",
        price: 82.5
    },
    {
        id: 35, name: "Darkryte", multiplier: 6.3, rarity: "mythical", area: "kingdom", color: "#f0f0f0", traitType: "armor", traits: [
            { description: "15.00% Chance to Dodge Damage (Negate Fully). On Armor.", scaling: { chance: { min: 1.5, max: 15 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/darkryte-the-forge-calculator.png",
        description: "A shadowy ore that absorbs light.",
        dropChance: "1/6655",
        price: 94.5
    },
    // Goblin Area
    { id: 39, name: "Orange Crystal Ore", multiplier: 3.0, rarity: "epic", area: "goblin", color: "#d8792a", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/orange-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/255", price: 45 },
    { id: 36, name: "Magenta Crystal Ore", multiplier: 3.1, rarity: "epic", area: "goblin", color: "#795ef8", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/magenta-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/255", price: 46.5 },
    { id: 38, name: "Green Crystal Ore", multiplier: 3.2, rarity: "epic", area: "goblin", color: "#68c87b", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/green-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/255", price: 48 },
    { id: 37, name: "Crimson Crystal Ore", multiplier: 3.3, rarity: "epic", area: "goblin", color: "#9a5065", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/crimson-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/255", price: 49.5 },
    { id: 40, name: "Blue Crystal Ore", multiplier: 3.4, rarity: "epic", area: "goblin", color: "#699cf1", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/blue-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/255", price: 51 },
    { id: 41, name: "Rainbow Crystal Ore", multiplier: 5.25, rarity: "legendary", area: "goblin", color: "#1b7c3a", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/rainbow-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/5000", price: 78.75 },
    { id: 42, name: "Arcane Crystal Ore", multiplier: 7.5, rarity: "mythical", area: "goblin", color: "#c8dbf5", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/arcane-crystal-the-forge-calculator.png", description: "No description available.", dropChance: "1/100000", price: 112.5 },
    { id: 47, name: "Galaxite", multiplier: 11.5, rarity: "relic", area: "goblin", color: "#220033", traitType: null, traits: [], description: "Sparkling like a chunk of space.", dropChance: "1/1M", price: 0 },

    // Frostpire Area
    { id: 48, name: "Tungsten Ore", multiplier: 2.6, rarity: "common", area: "frostpire", color: "#4a4a4a", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/tungsten-ore-the-forge.jpg", description: "Unyielding and absurdly dense. You feel more motivated just holding it.", dropChance: "1/180", price: 48.75 },
    { id: 49, name: "Sulfur Ore", multiplier: 2.75, rarity: "uncommon", area: "frostpire", color: "#E6E65C", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/sulfur-ore-the-forge.jpg", description: "Yellow, brittle, and smells exactly how you expect. Useful, dangerous, and easy to regret.", dropChance: "1/215", price: 51.56 },
    { id: 50, name: "Pumice Ore", multiplier: 2.9, rarity: "rare", area: "frostpire", color: "#D3D3D3", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/pumice-ore-the-forge.jpg", description: "Light, brittle, and full of air pockets. Floats briefly before remembering it’s a rock.", dropChance: "1/265", price: 54.38 },
    { id: 51, name: "Graphite Ore", multiplier: 3.1, rarity: "rare", area: "frostpire", color: "#2F4F4F", traitType: "all", traits: [{ description: "+5% Increased Vitality, and has a 20% chance to reduce Incoming Damage by 12%.", scaling: {}, type: "all" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/graphite-ore-the-forge.jpg", description: "Plain, dark, and deceptively useful. Not flashy, but it gets the job done without complaints.", dropChance: "1/315", price: 58.13 },
    { id: 52, name: "Aetherit Ore", multiplier: 3.4, rarity: "rare", area: "frostpire", color: "#9370DB", traitType: "all", traits: [{ description: "+5% Increased Movement Speed.", scaling: {}, type: "all" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/aetherit-ore-the-forge.jpg", description: "A broken piece of raw magic. Sharp, unstable, and absolutely not safe to pocket.", dropChance: "1/390", price: 63.75 },
    { id: 53, name: "Scheelite Ore", multiplier: 3.3, rarity: "rare", area: "frostpire", color: "#FFA500", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/scheelite-ore-the-forge.jpg", description: "Dull at first glance, valuable once refined. The kind of ore that rewards patience.", dropChance: "1/247", price: 69.38 },
    { id: 54, name: "Larimar Ore", multiplier: 4.1, rarity: "epic", area: "frostpire", color: "#00BFFF", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/larimar-updated-ore-the-forge.jpg", description: "Soft blue stone infused with calm energy. Holding it makes the caves feel less hostile, briefly.", dropChance: "1/575", price: 76.88 },
    { id: 55, name: "Neurotite Ore", multiplier: 4.3, rarity: "epic", area: "frostpire", color: "#FF69B4", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/neurotite-updated-ore-the-forge.jpg", description: "Warm and faintly organic in texture. Staying near it too long gives you strange ideas.", dropChance: "1/690", price: 80.63 },
    { id: 56, name: "Frost Fossil Ore", multiplier: 4.5, rarity: "epic", area: "frostpire", color: "#E0FFFF", traitType: "all", traits: [{ description: "+17.5% Increased Physical Damage and -5% reduced Movement Speed.", scaling: {}, type: "all" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/frost-fossil-updated-ore-the-forge.jpg", description: "Ancient remains frozen solid in eternal ice. Whatever it once was, it never got to finish dying.", dropChance: "1/820", price: 84.38 },
    { id: 57, name: "Tide Carve Ore", multiplier: 4.7, rarity: "epic", area: "frostpire", color: "#4682B4", traitType: null, traits: [], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/tide-carve-updated-ore-the-forge.jpg", description: "Shaped by relentless water pressure. Every edge tells a story of erosion and survival.", dropChance: "1/980", price: 88.13 },
    { id: 58, name: "Velchire Ore", multiplier: 5.5, rarity: "legendary", area: "frostpire", color: "#4169E1", traitType: "all", traits: [{ description: "+20% Increased Movement Speed.", scaling: {}, type: "all" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/velchire-ore-the-forge.jpg", description: "Smooth, refined, and unnaturally cold. Looks expensive even before forging.", dropChance: "1/1450", price: 103.13 },
    { id: 59, name: "Sanctis Ore", multiplier: 6, rarity: "legendary", area: "frostpire", color: "#FFFACD", traitType: "all", traits: [{ description: "+18% Increased Stamina.", scaling: {}, type: "all" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/sanctis-ore-the-forge.jpg", description: "Clean, radiant, and unnervingly pure. Feels wrong to break, but you do it anyway.", dropChance: "1/1830", price: 112.5 },
    { id: 60, name: "Snowite Ore", multiplier: 8, rarity: "legendary", area: "frostpire", color: "#FFFAFA", traitType: "weapon", traits: [{ description: "+15% to Attack Speed of your Weapon, and reduces Movement Speed of Enemies for 3 Seconds. 30% Chance to Hit.", scaling: {}, type: "weapon" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/snowite-ore-the-forge.jpg", description: "Light, sharp, and infused with wind energy. It almost floats when freshly mined.", dropChance: "1/4325", price: 150 },
    { id: 61, name: "Iceite", multiplier: 10.5, rarity: "mythical", area: "frostpire", color: "#00FFFF", traitType: "weapon", traits: [{ description: "25% Chance to Freeze Enemies for 2 seconds, 12 second Cooldown.", scaling: {}, type: "weapon" }], image: "https://bloxinformer-cdn.b-cdn.net/wp-content/uploads/2025/10/iceite-ore-the-forge.jpg", description: "Light, sharp, and infused with wind energy. It almost floats when freshly mined.", dropChance: "1/9898", price: 196.88 },

    // The Peak Area
    { id: 62, name: "Mistvein", multiplier: 7.2, rarity: "rare", area: "peak", color: "#A9A9A9", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/a/ab/Mistvein_Ore.png/64px-Mistvein_Ore.png", description: "Veined with drifting fog trapped inside the rock. Crack it open and the mist escapes instantly.", dropChance: "1/2626", price: 135 },
    { id: 63, name: "Lgarite", multiplier: 7.5, rarity: "rare", area: "peak", color: "#708090", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/f/f3/Lgarite_Ore.png/64px-Lgarite_Ore.png", description: "Jagged and oddly refined at the same time. Looks artificial, but no one remembers making it.", dropChance: "1/3131", price: 140.63 },
    { id: 64, name: "Voidfractal", multiplier: 8, rarity: "rare", area: "peak", color: "#483D8B", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/3/33/Voidfractal_Ore.png", description: "Endless patterns folded into solid matter. Staring too long makes your head hurt.", dropChance: "1/3456", price: 150 },
    { id: 65, name: "Moltenfrost", multiplier: 8.3, rarity: "epic", area: "peak", color: "#FF4500", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/3/3e/Moltenfrost_Ore.png", description: "Burns and freezes at the same time. Physics gave up trying to explain this one.", dropChance: "1/4004", price: 155.63 },
    { id: 66, name: "Crimsonite", multiplier: 8.5, rarity: "epic", area: "peak", color: "#DC143C", traitType: "all", traits: [{ description: "+20% Physical Damage (BOTH)", scaling: {}, type: "all" }], image: "https://static.wikitide.net/theforgewiki/thumb/b/ba/Crimsonite.png/64px-Crimsonite.png", description: "A deep red ore that radiates heat and anger. Miners swear it pulses when blood is nearby.", dropChance: "1/4540", price: 159.38 },
    { id: 67, name: "Malachite", multiplier: 8.8, rarity: "epic", area: "peak", color: "#00FA9A", traitType: "weapon", traits: [{ description: "Deals +10% of weapon damage as poison per second for 3 seconds. 33% chance on hit (Weapon)", scaling: {}, type: "weapon" }], image: "https://static.wikitide.net/theforgewiki/1/1d/Malachite_Ore.png", description: "Green, layered, and rich with minerals. Breaks cleanly, like it's used to being harvested.", dropChance: "1/5123", price: 165 },
    { id: 68, name: "Aquajade", multiplier: 9, rarity: "epic", area: "peak", color: "#7FFFD4", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/b/ba/Crimsonite.png/64px-Crimsonite.png", description: "Smooth, cool and heavy with ocean energy. Feels like it's been underwater longer than history.", dropChance: "1/5555", price: 168.75 },
    { id: 69, name: "Cryptex", multiplier: 9.3, rarity: "epic", area: "peak", color: "#8A2BE2", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/0/0b/Cryptex_Ore.png", description: "Layered with shifting patterns that never stay the same. No one agrees on what's inside, or if its watching.", dropChance: "1/6060", price: 174.38 },
    { id: 70, name: "Galestor", multiplier: 9.5, rarity: "epic", area: "peak", color: "#87CEEB", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/b/bb/Galestor_Ore.png/41px-Galestor_Ore.png", description: "Lightweight and charged with constant motion. Even at rest, it feels like it wants to escape", dropChance: "1/6666", price: 178.13 },
    { id: 71, name: "Voidstar", multiplier: 10, rarity: "legendary", area: "peak", color: "#191970", traitType: "weapon", traits: [{ description: "+33 crit chance | +15% crit damage | -15% vitality (Weapon)", scaling: {}, type: "weapon" }], image: "https://static.wikitide.net/theforgewiki/3/32/Voidstar_Ore.png", description: "A collapsed point of pure darkness. It absorbs light, sound and occasionally hope.", dropChance: "1/8179", price: 187.5 },
    { id: 72, name: "Etherealite", multiplier: 11.1, rarity: "mythical", area: "peak", color: "#E6E6FA", traitType: "armor", traits: [{ description: "+35% Vitality (Armor)", scaling: {}, type: "armor" }], image: "https://static.wikitide.net/theforgewiki/2/23/Etherealite_Ore.png", description: "Almost invisible unless the light hits it just right. It flickers between existing and not bothering to.", dropChance: "1/11111", price: 208.13 },
    { id: 73, name: "Suryafal", multiplier: 17.5, rarity: "relic", area: "peak", color: "#FFD700", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/b/ba/Crimsonite.png/64px-Crimsonite.png", description: "Sun-charged stone that radiates steady heat. Mining it feels like standing too close to daylight", dropChance: "1/50050", price: 328.13 },
    { id: 74, name: "Heavenite", multiplier: 25, rarity: "divine", area: "peak", color: "#F0F8FF", traitType: null, traits: [], image: "https://static.wikitide.net/theforgewiki/thumb/6/62/Heavenite.png/64px-Heavenite.png", description: "Warm to the touch and faintly glowing. Some say it fell from the sky, others say it was pushed.", dropChance: "1/157775", price: 0 },
    { id: 75, name: "Gargantuan", multiplier: 33.3, rarity: "divine", area: "peak", color: "#2F4F4F", traitType: "weapon", traits: [{ description: "Deals 20% of weapon damage as fire per seconds for 2 seconds. 20% chance on hit. Cause an explosion at location of victim, dealing 50% of weapon damage as AOE damage. 35% chance on hit (WEAPON)", scaling: {}, type: "weapon" }], image: "https://static.wikitide.net/theforgewiki/thumb/3/34/Gargantuan_Ore.png/64px-Gargantuan_Ore.png", description: "Dense, oversized, and brutally heavy. It takes effort just to remind it who's holding the pickaxe.", dropChance: "1/333333", price: 624.38 },
    { id: 76, name: "Mosasaursit", multiplier: 7, rarity: "exotic", area: "peak", color: "#B0C4DE", traitType: "all", traits: [{ description: "-25% swiftness and +65% vitality", scaling: {}, type: "all" }], image: "https://static.wikitide.net/theforgewiki/thumb/8/80/Mosasaursit.png/64px-Mosasaursit.png", description: "A fossilized skeleton of a prehistoric sea creature, its bones preserved by the cold waters of the island..", dropChance: "1/1", price: 135.25 }
];

export const WEAPON_PROBABILITIES: Record<number, Record<string, number>> = {
    3: { "Dagger": 1.0 },
    4: { "Dagger": 0.86, "Straight Sword": 0.07, "Spear": 0.07 },
    5: { "Dagger": 0.35, "Straight Sword": 0.325, "Spear": 0.325 },
    6: { "Dagger": 0.14, "Straight Sword": 0.43, "Spear": 0.43 },
    7: { "Dagger": 0.06, "Straight Sword": 0.37, "Spear": 0.37, "Gauntlet": 0.1, "Mace": 0.1 },
    8: { "Dagger": 0.02, "Straight Sword": 0.22, "Spear": 0.22, "Gauntlet": 0.27, "Mace": 0.27 },
    9: { "Dagger": 0.01, "Straight Sword": 0.12, "Spear": 0.12, "Gauntlet": 0.325, "Mace": 0.325, "Katana": 0.1 },
    10: { "Straight Sword": 0.055, "Spear": 0.055, "Gauntlet": 0.235, "Mace": 0.235, "Katana": 0.42 },
    11: { "Straight Sword": 0.025, "Spear": 0.025, "Gauntlet": 0.16, "Mace": 0.16, "Katana": 0.63 },
    12: { "Straight Sword": 0.015, "Spear": 0.015, "Gauntlet": 0.11, "Mace": 0.11, "Katana": 0.72, "Great Sword": 0.03 },
    13: { "Straight Sword": 0.005, "Spear": 0.005, "Gauntlet": 0.075, "Mace": 0.075, "Katana": 0.62, "Great Sword": 0.22 },
    14: { "Straight Sword": 0.005, "Spear": 0.005, "Gauntlet": 0.04, "Mace": 0.04, "Katana": 0.46, "Great Sword": 0.45 },
    15: { "Gauntlet": 0.025, "Mace": 0.025, "Katana": 0.35, "Great Sword": 0.6 },
    16: { "Gauntlet": 0.015, "Mace": 0.015, "Katana": 0.26, "Great Sword": 0.70, "Great Axe": 0.01 },
    17: { "Gauntlet": 0.01, "Mace": 0.01, "Katana": 0.19, "Great Sword": 0.68, "Great Axe": 0.11 },
    18: { "Gauntlet": 0.01, "Mace": 0.01, "Katana": 0.13, "Great Sword": 0.57, "Great Axe": 0.28 },
    19: { "Gauntlet": 0.005, "Mace": 0.005, "Katana": 0.08, "Great Sword": 0.46, "Great Axe": 0.45 },
    20: { "Gauntlet": 0.005, "Mace": 0.005, "Katana": 0.06, "Great Sword": 0.36, "Great Axe": 0.57 },
    21: { "Katana": 0.04, "Great Sword": 0.29, "Great Axe": 0.65, "Colossal Sword": 0.02 },
    22: { "Katana": 0.03, "Great Sword": 0.23, "Great Axe": 0.67, "Colossal Sword": 0.07 },
    23: { "Katana": 0.02, "Great Sword": 0.19, "Great Axe": 0.66, "Colossal Sword": 0.13 },
    24: { "Katana": 0.02, "Great Sword": 0.15, "Great Axe": 0.63, "Colossal Sword": 0.2 },
    25: { "Katana": 0.01, "Great Sword": 0.12, "Great Axe": 0.6, "Colossal Sword": 0.27 },
    30: { "Great Sword": 0.06, "Great Axe": 0.45, "Colossal Sword": 0.49 },
    35: { "Great Sword": 0.04, "Great Axe": 0.37, "Colossal Sword": 0.59 },
    40: { "Great Sword": 0.03, "Great Axe": 0.32, "Colossal Sword": 0.65 },
    50: { "Great Sword": 0.02, "Great Axe": 0.28, "Colossal Sword": 0.7 }
};

export const ARMOR_PROBABILITIES: Record<number, Record<string, number>> = {
    3: { "Light Helmet": 1.0 },
    4: { "Light Helmet": 1.0 },
    5: { "Light Helmet": 0.89, "Light Leggings": 0.11 },
    6: { "Light Helmet": 0.56, "Light Leggings": 0.44 },
    7: { "Light Helmet": 0.32, "Light Leggings": 0.67, "Light Chestplate": 0.01 },
    8: { "Light Helmet": 0.16, "Light Leggings": 0.67, "Light Chestplate": 0.17 },
    9: { "Light Helmet": 0.08, "Light Leggings": 0.51, "Light Chestplate": 0.41 },
    10: { "Light Helmet": 0.04, "Light Leggings": 0.34, "Light Chestplate": 0.53, "Medium Helmet": 0.09 },
    11: { "Light Helmet": 0.02, "Light Leggings": 0.2, "Light Chestplate": 0.47, "Medium Helmet": 0.31 },
    12: { "Light Helmet": 0.01, "Light Leggings": 0.12, "Light Chestplate": 0.37, "Medium Helmet": 0.5 },
    13: { "Light Leggings": 0.07, "Light Chestplate": 0.28, "Medium Helmet": 0.6, "Medium Leggings": 0.04 },
    14: { "Light Leggings": 0.04, "Light Chestplate": 0.19, "Medium Helmet": 0.55, "Medium Leggings": 0.22 },
    15: { "Light Leggings": 0.02, "Light Chestplate": 0.12, "Medium Helmet": 0.43, "Medium Leggings": 0.43 },
    16: { "Light Leggings": 0.01, "Light Chestplate": 0.08, "Medium Helmet": 0.32, "Medium Leggings": 0.57, "Medium Chestplate": 0.02 },
    17: { "Light Chestplate": 0.05, "Medium Helmet": 0.22, "Medium Leggings": 0.57, "Medium Chestplate": 0.16 },
    18: { "Light Chestplate": 0.03, "Medium Helmet": 0.14, "Medium Leggings": 0.48, "Medium Chestplate": 0.35 },
    19: { "Light Chestplate": 0.02, "Medium Helmet": 0.09, "Medium Leggings": 0.39, "Medium Chestplate": 0.5 },
    20: { "Light Chestplate": 0.01, "Medium Helmet": 0.06, "Medium Leggings": 0.32, "Medium Chestplate": 0.6, "Heavy Helmet": 0.01 },
    21: { "Medium Helmet": 0.04, "Medium Leggings": 0.25, "Medium Chestplate": 0.63, "Heavy Helmet": 0.07 },
    22: { "Medium Helmet": 0.03, "Medium Leggings": 0.19, "Medium Chestplate": 0.59, "Heavy Helmet": 0.19 },
    23: { "Medium Helmet": 0.02, "Medium Leggings": 0.14, "Medium Chestplate": 0.52, "Heavy Helmet": 0.32 },
    24: { "Medium Helmet": 0.01, "Medium Leggings": 0.11, "Medium Chestplate": 0.44, "Heavy Helmet": 0.44 },
    25: { "Medium Helmet": 0.01, "Medium Leggings": 0.07, "Medium Chestplate": 0.36, "Heavy Helmet": 0.51, "Heavy Leggings": 0.05 },
    26: { "Medium Helmet": 0.01, "Medium Leggings": 0.05, "Medium Chestplate": 0.28, "Heavy Helmet": 0.51, "Heavy Leggings": 0.15 },
    27: { "Medium Leggings": 0.04, "Medium Chestplate": 0.21, "Heavy Helmet": 0.47, "Heavy Leggings": 0.28 },
    28: { "Medium Leggings": 0.03, "Medium Chestplate": 0.16, "Heavy Helmet": 0.42, "Heavy Leggings": 0.39 },
    29: { "Medium Leggings": 0.02, "Medium Chestplate": 0.11, "Heavy Helmet": 0.35, "Heavy Leggings": 0.48, "Heavy Chestplate": 0.04 },
    30: { "Medium Leggings": 0.01, "Medium Chestplate": 0.08, "Heavy Helmet": 0.28, "Heavy Leggings": 0.50, "Heavy Chestplate": 0.13 },
    35: { "Medium Chestplate": 0.02, "Heavy Helmet": 0.08, "Heavy Leggings": 0.3, "Heavy Chestplate": 0.6 },
    40: { "Heavy Helmet": 0.04, "Heavy Leggings": 0.2, "Heavy Chestplate": 0.75 },
    50: { "Heavy Helmet": 0.02, "Heavy Leggings": 0.14, "Heavy Chestplate": 0.84 },
};

export const BASE_ITEM_STATS: Record<string, Record<string, ItemStat>> = {
    weapon: {
        "Dagger": { damage: 8.6, atkSpeed: 0.35, range: 6, price: 68, type: "Dagger" },
        "Falchion Knife": { damage: 8.6, atkSpeed: 0.35, range: 6, price: 68, type: "Dagger" },
        "Gladius Dagger": { damage: 8.6, atkSpeed: 0.35, range: 6, price: 68, type: "Dagger" },
        "Hook": { damage: 9.46, atkSpeed: 0.39, range: 6, price: 68, type: "Dagger" },
        "Falchion": { damage: 15, atkSpeed: 0.59, range: 8, price: 120, type: "Straight Sword" },
        "Gladius": { damage: 15.75, atkSpeed: 0.62, range: 8, price: 120, type: "Straight Sword" },
        "Cutlass": { damage: 18.75, atkSpeed: 0.66, range: 8, price: 120, type: "Straight Sword" },
        "Rapier": { damage: 15, atkSpeed: 0.49, range: 8, price: 120, type: "Straight Sword" },
        "Chaos": { damage: 18.75, atkSpeed: 0.59, range: 8, price: 120, type: "Straight Sword" },
        "Ironhand": { damage: 15.2, atkSpeed: 0.51, range: 6, price: 205, type: "Gauntlet" },
        "Boxing Gloves": { damage: 16, atkSpeed: 0.59, range: 6, price: 205, type: "Gauntlet" },
        "Relevator": { damage: 19.2, atkSpeed: 0.69, range: 6, price: 205, type: "Gauntlet" },
        "Uchigatana": { damage: 17, atkSpeed: 0.6, range: 9, price: 324, type: "Katana" },
        "Tachi": { damage: 17.85, atkSpeed: 0.63, range: 9, price: 324, type: "Katana" },
        "Crusader Sword": { damage: 24, atkSpeed: 1.0, range: 9, price: 485, type: "Great Sword" },
        "Long Sword": { damage: 24, atkSpeed: 1.11, range: 9, price: 485, type: "Great Sword" },
        "Scythe": { damage: 28.5, atkSpeed: 0.95, range: 9, price: 850, type: "Great Axe" },
        "Double Battle Axe": { damage: 31.5, atkSpeed: 1.05, range: 9, price: 850, type: "Great Axe" },
        "Great Sword": { damage: 40, atkSpeed: 1.12, range: 10, price: 1355, type: "Colossal Sword" },
        "Dragon Slayer": { damage: 44, atkSpeed: 1.12, range: 10, price: 1355, type: "Colossal Sword" },
        "Hammer": { damage: 44, atkSpeed: 1.24, range: 10, price: 1355, type: "Colossal Sword" },
        "Skull Crusher": { damage: 48, atkSpeed: 1.4, range: 10, price: 1355, type: "Colossal Sword" },
        "Comically Large Spoon": { damage: 36, atkSpeed: 1.12, range: 10, price: 1355, type: "Colossal Sword" },
        "Mace": { damage: 6, atkSpeed: 0.46, range: 8, price: 205, type: "Mace" },
        "Winged Mace": { damage: 6, atkSpeed: 0.46, range: 8, price: 205, type: "Mace" },
        "Spiked Mace": { damage: 6, atkSpeed: 0.46, range: 8, price: 205, type: "Mace" },
        "Spear": { damage: 7.5, atkSpeed: 0.45, range: 11, price: 120, type: "Spear" },
        "Demonic Spear": { damage: 9, atkSpeed: 0.56, range: 11, price: 120, type: "Spear" },
        "Angelic Spear": { damage: 9.75, atkSpeed: 0.41, range: 11, price: 120, type: "Spear" },
        "Trident": { damage: 7.5, atkSpeed: 0.45, range: 11, price: 120, type: "Spear" }
    },
    armor: {
        "Light Helmet": { health: 3.75, price: 65, def: 8, type: "Light Helmet" },
        "Light Leggings": { health: 4.375, price: 112.5, def: 9, type: "Light Leggings" },
        "Light Chestplate": { health: 5, price: 225, def: 10, type: "Light Chestplate" },
        "Medium Helmet": { health: 6.25, price: 335, def: 12, type: "Medium Helmet" },
        "Samurai Helmet": { health: 8, price: 335, def: 16, type: "Medium Helmet" },
        "Medium Leggings": { health: 7.5, price: 485, def: 15, type: "Medium Leggings" },
        "Samurai Leggings": { health: 9, price: 485, def: 20, type: "Medium Leggings" },
        "Medium Chestplate": { health: 8.75, price: 850, def: 18, type: "Medium Chestplate" },
        "Samurai Chestplate": { health: 12.75, price: 850, def: 24, type: "Medium Chestplate" },
        "Knight Helmet": { health: 12.5, price: 1020, def: 24, type: "Heavy Helmet" },
        "Dark Knight Helmet": { health: 18.75, price: 1224, def: 38, type: "Heavy Helmet" },
        "Knight Leggings": { health: 13.75, price: 1200, def: 28, type: "Heavy Leggings" },
        "Dark Knight Leggings": { health: 21.875, price: 1440, def: 44, type: "Heavy Leggings" },
        "Knight Chestplate": { health: 16.25, price: 1355, def: 32, type: "Heavy Chestplate" },
        "Dark Knight Chestplate": { health: 25, price: 1626, def: 50, type: "Heavy Chestplate" },
        "Viking Helmet": { health: 10.5, price: 335, def: 14, type: "Medium Helmet" },
        "Viking Chestplate": { health: 16, price: 525, def: 20, type: "Medium Chestplate" },
        "Viking Leggings": { health: 11, price: 485, def: 16, type: "Medium Leggings" },
        "Wolf Helmet": { health: 25, price: 1355, def: 40, type: "Heavy Helmet" },
        "Wolf Chestplate": { health: 35, price: 1355, def: 55, type: "Heavy Chestplate" },
        "Wolf Leggings": { health: 28, price: 1200, def: 48, type: "Heavy Leggings" }
    }
};

export const ITEM_VARIANTS: Record<string, Record<string, Record<string, { name: string, chance: string, probability: number }[]>>> = {
    weapon: {
        "Dagger": {
            "stonewake": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }],
            "kingdom": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }],
            "goblin": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }],
            "enemy": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }],
            "frostpire": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }],
            "peak": [{ name: "Dagger", chance: "1/1", probability: 1.0 }, { name: "Falchion Knife", chance: "1/2", probability: 0.5 }, { name: "Gladius Dagger", chance: "1/4", probability: 0.25 }, { name: "Hook", chance: "1/16", probability: 0.0625 }]
        },
        "Straight Sword": {
            "stonewake": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }],
            "kingdom": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }],
            "goblin": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }],
            "enemy": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }],
            "frostpire": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }],
            "peak": [{ name: "Falchion", chance: "1/1", probability: 1.0 }, { name: "Gladius", chance: "1/2", probability: 0.5 }, { name: "Cutlass", chance: "1/4", probability: 0.25 }, { name: "Rapier", chance: "1/8", probability: 0.125 }, { name: "Chaos", chance: "1/16", probability: 0.0625 }]
        },
        "Gauntlet": {
            "stonewake": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }],
            "kingdom": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }],
            "goblin": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }],
            "enemy": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }],
            "frostpire": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }],
            "peak": [{ name: "Ironhand", chance: "1/1", probability: 1.0 }, { name: "Boxing Gloves", chance: "1/4", probability: 0.25 }, { name: "Relevator", chance: "1/16", probability: 0.0625 }]
        },
        "Katana": {
            "stonewake": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Uchigatana", chance: "1/1", probability: 1.0 }, { name: "Tachi", chance: "1/2", probability: 0.5 }]
        },
        "Great Sword": {
            "stonewake": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Crusader Sword", chance: "1/1", probability: 1.0 }, { name: "Long Sword", chance: "1/2", probability: 0.5 }]
        },
        "Great Axe": {
            "stonewake": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Double Battle Axe", chance: "1/1", probability: 1.0 }, { name: "Scythe", chance: "1/2", probability: 0.5 }]
        },
        "Colossal Sword": {
            "stonewake": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }],
            "kingdom": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }],
            "goblin": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }],
            "enemy": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }],
            "frostpire": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }],
            "peak": [{ name: "Great Sword", chance: "1/1", probability: 1.0 }, { name: "Hammer", chance: "1/2", probability: 0.5 }, { name: "Skull Crusher", chance: "1/2", probability: 0.5 }, { name: "Dragon Slayer", chance: "1/3", probability: 0.333 }, { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }]
        },
        "Mace": {
            "stonewake": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Mace", chance: "1/1", probability: 1.0 }, { name: "Winged Mace", chance: "1/4", probability: 0.25 }, { name: "Spiked Mace", chance: "1/2", probability: 0.5 }]
        },
        "Spear": {
            "stonewake": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Spear", chance: "1/1", probability: 1.0 }, { name: "Demonic Spear", chance: "1/8", probability: 0.125 }, { name: "Angelic Spear", chance: "1/8", probability: 0.125 }, { name: "Trident", chance: "1/2", probability: 0.5 }]
        }
    },
    armor: {
        "Light Helmet": {
            "stonewake": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }],
            "kingdom": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }],
            "goblin": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }],
            "enemy": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }],
            "frostpire": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }],
            "peak": [{ name: "Light Helmet", chance: "1/1", probability: 1.0 }]
        },
        "Light Leggings": {
            "stonewake": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }],
            "kingdom": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }],
            "goblin": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }],
            "enemy": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }],
            "frostpire": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }],
            "peak": [{ name: "Light Leggings", chance: "1/2", probability: 0.5 }]
        },
        "Light Chestplate": {
            "stonewake": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }],
            "kingdom": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }],
            "goblin": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }],
            "enemy": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }],
            "frostpire": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }],
            "peak": [{ name: "Light Chestplate", chance: "1/3", probability: 0.333 }]
        },
        "Medium Helmet": {
            "stonewake": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Medium Helmet", chance: "1/1", probability: 1.0 }, { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }, { name: "Viking Helmet", chance: "1/4", probability: 0.25 }]
        },
        "Medium Leggings": {
            "stonewake": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Medium Leggings", chance: "1/2", probability: 0.5 }, { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }, { name: "Viking Leggings", chance: "1/4", probability: 0.25 }]
        },
        "Medium Chestplate": {
            "stonewake": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Medium Chestplate", chance: "1/3", probability: 0.333 }, { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }, { name: "Viking Chestplate", chance: "1/4", probability: 0.25 }]
        },
        "Heavy Helmet": {
            "stonewake": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }, { name: "Wolf Helmet", chance: "1/4", probability: 0.25 }]
        },
        "Heavy Leggings": {
            "stonewake": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }, { name: "Wolf Leggings", chance: "1/4", probability: 0.25 }]
        },
        "Heavy Chestplate": {
            "stonewake": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }],
            "kingdom": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }],
            "goblin": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }],
            "enemy": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }],
            "frostpire": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }],
            "peak": [{ name: "Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }, { name: "Wolf Chestplate", chance: "1/4", probability: 0.25 }]
        }
    }
};

// Best Weapons Recipes
export const BEST_WEAPONS_RECIPES = {
    "Icy Boulder (Mid Tier)": [
        { tier: "Straight Sword", recipe: [{ ore: "Iceite", count: 4 }, { ore: "Snowite", count: 2 }], multiplier: 9.67, chance: 75 },
        { tier: "Gauntlet", recipe: [{ ore: "Iceite", count: 6 }, { ore: "Snowite", count: 3 }], multiplier: 9.67, chance: 75 },
        { tier: "Greataxe", recipe: [{ ore: "Iceite", count: 15 }, { ore: "Snowite", count: 7 }], multiplier: 9.70, chance: 75 },
        { tier: "Colossal Sword", recipe: [{ ore: "Iceite", count: 35 }, { ore: "Snowite", count: 15 }], multiplier: 9.75, chance: 75 }
    ],
    "Small Ice Crystals (Low-Mid Tier)": [
        { tier: "Straight Sword", recipe: [{ ore: "Iceite", count: 2 }, { ore: "Crimsonite", count: 2 }, { ore: "Snowite", count: 2 }], multiplier: 9.0, chance: 75 },
        { tier: "Gauntlet", recipe: [{ ore: "Iceite", count: 3 }, { ore: "Crimsonite", count: 3 }, { ore: "Snowite", count: 3 }], multiplier: 9.0, chance: 75 },
        { tier: "Greataxe", recipe: [{ ore: "Iceite", count: 8 }, { ore: "Crimsonite", count: 7 }, { ore: "Snowite", count: 7 }], multiplier: 9.07, chance: 75 },
        { tier: "Colossal Sword", recipe: [{ ore: "Iceite", count: 17 }, { ore: "Crimsonite", count: 16 }, { ore: "Snowite", count: 16 }], multiplier: 9.03, chance: 75 }
    ],
    "Medium Ice Crystals (High Tier)": [
        { tier: "Straight Sword", recipe: [{ ore: "Suryafal", count: 2 }, { ore: "Iceite", count: 2 }, { ore: "Voidstar", count: 2 }], multiplier: 12.67, chance: 75 },
        { tier: "Gauntlet", recipe: [{ ore: "Suryafal", count: 3 }, { ore: "Iceite", count: 3 }, { ore: "Voidstar", count: 3 }], multiplier: 12.67, chance: 75 },
        { tier: "Greataxe", recipe: [{ ore: "Suryafal", count: 8 }, { ore: "Iceite", count: 7 }, { ore: "Voidstar", count: 7 }], multiplier: 12.89, chance: 75 },
        { tier: "Colossal Sword", recipe: [{ ore: "Suryafal", count: 17 }, { ore: "Iceite", count: 16 }, { ore: "Voidstar", count: 16 }], multiplier: 12.77, chance: 75 }
    ],
    "Large Ice Crystals (Higher Tier)": [
        { tier: "Straight Sword", recipe: [{ ore: "Gargantuan", count: 2 }, { ore: "Voidstar", count: 2 }, { ore: "Iceite", count: 2 }], multiplier: 17.93, chance: 75 },
        { tier: "Gauntlet", recipe: [{ ore: "Gargantuan", count: 3 }, { ore: "Voidstar", count: 3 }, { ore: "Iceite", count: 3 }], multiplier: 17.93, chance: 75 },
        { tier: "Greataxe", recipe: [{ ore: "Gargantuan", count: 8 }, { ore: "Voidstar", count: 7 }, { ore: "Iceite", count: 7 }], multiplier: 18.63, chance: 75 },
        { tier: "Colossal Sword", recipe: [{ ore: "Gargantuan", count: 17 }, { ore: "Voidstar", count: 16 }, { ore: "Iceite", count: 16 }], multiplier: 18.25, chance: 75 }
    ],
    "Large Ice Crystals (Crazy Tier)": [
        { tier: "Straight Sword", recipe: [{ ore: "Gargantuan", count: 6 }], multiplier: 33.3, chance: 75 },
        { tier: "Gauntlet", recipe: [{ ore: "Gargantuan", count: 9 }], multiplier: 33.3, chance: 75 },
        { tier: "Greataxe", recipe: [{ ore: "Gargantuan", count: 22 }], multiplier: 33.3, chance: 75 },
        { tier: "Colossal Sword", recipe: [{ ore: "Gargantuan", count: 49 }], multiplier: 33.3, chance: 75 }
    ],
    "Uchi Katana": [
        { tier: "Top 1", recipe: [{ ore: "Darkryte", count: 9 }, { ore: "Magmaite", count: 4 }], multiplier: 5.8, chance: 62 },
        { tier: "Top 2", recipe: [{ ore: "Darkryte", count: 6 }, { ore: "Demonite", count: 4 }, { ore: "Eye Ore", count: 3 }], multiplier: 5.5, chance: 64 },
        { tier: "Top 3", recipe: [{ ore: "Darkryte", count: 8 }, { ore: "Magmaite", count: 4 }], multiplier: 5.86, chance: 72 },
        { tier: "End game", recipe: [{ ore: "Darkryte", count: 6 }, { ore: "Magmaite", count: 6 }], multiplier: 5.65, chance: 72 },
        { tier: "End Game", recipe: [{ ore: "Darkryte", count: 4 }, { ore: "Magmaite", count: 3 }, { ore: "Eye Ore", count: 3 }, { ore: "Fireite", count: 3 }], multiplier: 5.05, chance: 64 },
        { tier: "Mid/End Game", recipe: [{ ore: "Demonite", count: 4 }, { ore: "Magmaite", count: 3 }, { ore: "Eye Ore", count: 3 }, { ore: "Fireite", count: 3 }], multiplier: 4.81, chance: 64 },
        { tier: "Mid Game", recipe: [{ ore: "Eye Ore", count: 4 }, { ore: "Magmaite", count: 4 }], multiplier: 4.5, chance: 72 },
        { tier: "Mid Game", recipe: [{ ore: "Eye Ore", count: 6 }, { ore: "Rivalite", count: 6 }], multiplier: 3.6, chance: 72 }
    ],
    "Falchion Straight Swords": [
        { tier: "Best Weapon - Chaos 1/16 Chance", recipe: [{ ore: "Darkryte", count: 4 }, { ore: "Magmaite", count: 2 }], multiplier: 5.87, chance: 86 },
        { tier: "Insane", recipe: [{ ore: "Darkryte", count: 3 }, { ore: "Eye Ore", count: 2 }, { ore: "Magmaite", count: 2 }], multiplier: 5.27, chance: 74 },
        { tier: "End Game", recipe: [{ ore: "Demonite", count: 4 }, { ore: "Fireite", count: 2 }, { ore: "Magmaite", count: 1 }], multiplier: 5.14, chance: 74 },
        { tier: "End/Late Game", recipe: [{ ore: "Eye Ore", count: 3 }, { ore: "Fireite", count: 3 }, { ore: "Magmaite", count: 1 }], multiplier: 4.35, chance: 74 },
        { tier: "Mid Game", recipe: [{ ore: "Rivalite", count: 3 }, { ore: "Ruby", count: 3 }], multiplier: 3.14, chance: 86 }
    ],
    "Iron hand Gauntlets": [
        { tier: "Insane", recipe: [{ ore: "Darkryte", count: 6 }, { ore: "Magmaite", count: 3 }], multiplier: 5.87, chance: 65 },
        { tier: "End Game", recipe: [{ ore: "Darkryte", count: 3 }, { ore: "Magmaite", count: 3 }, { ore: "Fireite", count: 2 }, { ore: "Eye Ore", count: 1 }], multiplier: 5.21, chance: 65 },
        { tier: "Late Game", recipe: [{ ore: "Magmaite", count: 3 }, { ore: "Fireite", count: 3 }, { ore: "Rivalite", count: 2 }, { ore: "Eye Ore", count: 1 }], multiplier: 4.35, chance: 65 },
        { tier: "Mid Game", recipe: [{ ore: "Eye Ore", count: 4 }, { ore: "Rivalite", count: 3 }, { ore: "Ruby", count: 2 }], multiplier: 3.54, chance: 65 }
    ],
    "Great Colossal Swords": [
        { tier: "Insane", recipe: [{ ore: "Darkryte", count: 35 }, { ore: "Magmaite", count: 15 }], multiplier: 5.81, chance: 70 },
        { tier: "Insane", recipe: [{ ore: "Demonite", count: 35 }, { ore: "Magmaite", count: 15 }], multiplier: 5.35, chance: 70 },
        { tier: "End Game", recipe: [{ ore: "Darkryte", count: 12 }, { ore: "Demonite", count: 6 }, { ore: "Eye Ore", count: 10 }, { ore: "Magmaite", count: 10 }], multiplier: 5.33, chance: 65 },
        { tier: "Late/End Game", recipe: [{ ore: "Magmaite", count: 16 }, { ore: "Fireite", count: 4 }, { ore: "Eye Ore", count: 10 }], multiplier: 4.58, chance: 65 },
        { tier: "Mid Game", recipe: [{ ore: "Eye Ore", count: 16 }, { ore: "Rivalite", count: 14 }, { ore: "Ruby", count: 10 }], multiplier: 3.50, chance: 65 },
        { tier: "Mid Game", recipe: [{ ore: "Eye Ore", count: 10 }, { ore: "Rivalite", count: 18 }, { ore: "Ruby", count: 12 }], multiplier: 3.38, chance: 65 }
    ]
};

// Best Armor Recipes
export const BEST_ARMOR_RECIPES = {
    "BEST RECIPE": [
        { piece: "Chestplate", recipe: [{ ore: "Gargantuan", count: 28 }, { ore: "Etherealite", count: 12 }], multiplier: 26.64, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Gargantuan", count: 18 }, { ore: "Etherealite", count: 8 }], multiplier: 26.47, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Gargantuan", count: 21 }, { ore: "Etherealite", count: 9 }], multiplier: 26.64, chance: 50 }
    ],
    "Speed Set": [
        { piece: "Chestplate", recipe: [{ ore: "Gargantuan", count: 16 }, { ore: "Lightite", count: 12 }, { ore: "Velchire", count: 12 }], multiplier: 16.35, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Gargantuan", count: 10 }, { ore: "Lightite", count: 8 }, { ore: "Velchire", count: 8 }], multiplier: 15.91, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Gargantuan", count: 12 }, { ore: "Lightite", count: 9 }, { ore: "Velchire", count: 9 }], multiplier: 16.35, chance: 50 }
    ],
    "Damage Set": [
        { piece: "Chestplate", recipe: [{ ore: "Gargantuan", count: 16 }, { ore: "Frost Fossil", count: 12 }, { ore: "Eye Ore", count: 12 }], multiplier: 15.87, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Gargantuan", count: 10 }, { ore: "Frost Fossil", count: 8 }, { ore: "Eye Ore", count: 8 }], multiplier: 15.42, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Gargantuan", count: 12 }, { ore: "Frost Fossil", count: 9 }, { ore: "Eye Ore", count: 9 }], multiplier: 15.87, chance: 50 }
    ],
    "Late Island 3 Set": [
        { piece: "Chestplate", recipe: [{ ore: "Suryafal", count: 16 }, { ore: "Frost Fossil", count: 12 }, { ore: "Etherealite", count: 12 }], multiplier: 11.68, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Suryafal", count: 10 }, { ore: "Frost Fossil", count: 8 }, { ore: "Etherealite", count: 8 }], multiplier: 11.53, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Suryafal", count: 12 }, { ore: "Frost Fossil", count: 9 }, { ore: "Etherealite", count: 9 }], multiplier: 11.68, chance: 50 }
    ],
    "Mid Island 3 Set": [
        { piece: "Chestplate", recipe: [{ ore: "Etherealite", count: 16 }, { ore: "Frost Fossil", count: 12 }, { ore: "Velchire", count: 12 }], multiplier: 7.44, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Etherealite", count: 10 }, { ore: "Frost Fossil", count: 8 }, { ore: "Velchire", count: 8 }], multiplier: 7.34, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Etherealite", count: 12 }, { ore: "Frost Fossil", count: 9 }, { ore: "Velchire", count: 9 }], multiplier: 7.44, chance: 50 }
    ],
    "Early Island 3 Set": [
        { piece: "Chestplate", recipe: [{ ore: "Snowite", count: 16 }, { ore: "Frost Fossil", count: 12 }, { ore: "Velchire", count: 12 }], multiplier: 6.20, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Snowite", count: 10 }, { ore: "Frost Fossil", count: 8 }, { ore: "Velchire", count: 8 }], multiplier: 6.15, chance: 50 },
        { piece: "Leggings", recipe: [{ ore: "Snowite", count: 12 }, { ore: "Frost Fossil", count: 9 }, { ore: "Velchire", count: 9 }], multiplier: 6.20, chance: 50 }
    ],
    "INSANE": [
        { piece: "Chestplate", recipe: [{ ore: "Darkryte", count: 20 }, { ore: "Demonite", count: 13 }, { ore: "Mythril", count: 6 }], multiplier: 5.80, chance: 73 },
        { piece: "Helmet", recipe: [{ ore: "Darkryte", count: 12 }, { ore: "Demonite", count: 8 }, { ore: "Mythril", count: 6 }], multiplier: 5.41, chance: 51 },
        { piece: "Leggings", recipe: [{ ore: "Darkryte", count: 12 }, { ore: "Demonite", count: 10 }, { ore: "Mythril", count: 8 }], multiplier: 5.29, chance: 49 }
    ],
    "Eye Ore Set": [
        { piece: "Chestplate", recipe: [{ ore: "Darkryte", count: 16 }, { ore: "Demonite", count: 12 }, { ore: "Eye Ore", count: 12 }], multiplier: 5.37, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Darkryte", count: 9 }, { ore: "Obsidian", count: 9 }, { ore: "Eye Ore", count: 9 }], multiplier: 4.22, chance: 51 },
        { piece: "Leggings", recipe: [{ ore: "Darkryte", count: 12 }, { ore: "Obsidian", count: 9 }, { ore: "Eye Ore", count: 9 }], multiplier: 4.42, chance: 49 }
    ],
    "Fastest Set": [
        { piece: "Chestplate", recipe: [{ ore: "Darkryte", count: 17 }, { ore: "Demonite", count: 13 }, { ore: "Lightite", count: 13 }], multiplier: 5.54, chance: 78 },
        { piece: "Helmet", recipe: [{ ore: "Darkryte", count: 9 }, { ore: "Demonite", count: 8 }, { ore: "Lightite", count: 9 }], multiplier: 5.13, chance: 51 },
        { piece: "Leggings", recipe: [{ ore: "Darkryte", count: 10 }, { ore: "Demonite", count: 10 }, { ore: "Lightite", count: 10 }], multiplier: 5.17, chance: 49 }
    ],
    "INSANE #2": [
        { piece: "Chestplate", recipe: [{ ore: "Demonite", count: 14 }, { ore: "Mythril", count: 11 }, { ore: "Eye Ore", count: 11 }], multiplier: 4.58, chance: 75 },
        { piece: "Helmet", recipe: [{ ore: "Demonite", count: 9 }, { ore: "Mythril", count: 8 }, { ore: "Eye Ore", count: 9 }], multiplier: 4.37, chance: 51 },
        { piece: "Leggings", recipe: [{ ore: "Demonite", count: 11 }, { ore: "Mythril", count: 9 }, { ore: "Eye Ore", count: 10 }], multiplier: 4.40, chance: 49 }
    ],
    "End Game/Late": [
        { piece: "Chestplate", recipe: [{ ore: "Lightite", count: 14 }, { ore: "Mythril", count: 12 }, { ore: "Eye Ore", count: 13 }], multiplier: 4.08, chance: 73 },
        { piece: "Helmet", recipe: [{ ore: "Lightite", count: 9 }, { ore: "Mythril", count: 8 }, { ore: "Eye Ore", count: 9 }], multiplier: 4.06, chance: 51 },
        { piece: "Leggings", recipe: [{ ore: "Lightite", count: 11 }, { ore: "Mythril", count: 9 }, { ore: "Eye Ore", count: 10 }], multiplier: 4.07, chance: 49 }
    ],
    "Late Game": [
        { piece: "Chestplate", recipe: [{ ore: "Mythril", count: 16 }, { ore: "Eye Ore", count: 10 }, { ore: "Obsidian", count: 10 }], multiplier: 3.92, chance: 71 },
        { piece: "Helmet", recipe: [{ ore: "Mythril", count: 9 }, { ore: "Uranium", count: 9 }, { ore: "Obsidian", count: 9 }], multiplier: 3.08, chance: 47 },
        { piece: "Leggings", recipe: [{ ore: "Mythril", count: 12 }, { ore: "Eye Ore", count: 10 }, { ore: "Obsidian", count: 8 }], multiplier: 3.86, chance: 49 }
    ],
    "Mid Game": [
        { piece: "Chestplate", recipe: [{ ore: "Ruby", count: 16 }, { ore: "Emerald", count: 10 }, { ore: "Cuprite", count: 10 }], multiplier: 2.69, chance: 64 },
        { piece: "Helmet", recipe: [{ ore: "Ruby", count: 9 }, { ore: "Emerald", count: 9 }, { ore: "Cuprite", count: 9 }], multiplier: 2.67, chance: 47 },
        { piece: "Leggings", recipe: [{ ore: "Ruby", count: 12 }, { ore: "Emerald", count: 10 }, { ore: "Cuprite", count: 8 }], multiplier: 2.80, chance: 49 }
    ]
};

export const ITEM_IMAGES: Record<string, string> = {
    "Boxing Gloves": "https://static.wikitide.net/theforgewiki/thumb/f/ff/Boxingglove.png/80px-Boxingglove.png",
    "Chaos": "https://static.wikitide.net/theforgewiki/thumb/8/8f/Chaos.png/80px-Chaos.png",
    "Comically Large Spoon": "https://static.wikitide.net/theforgewiki/thumb/9/98/ComicallyLargeSpoon.png/80px-ComicallyLargeSpoon.png",
    "Crusader Sword": "https://static.wikitide.net/theforgewiki/thumb/7/7b/CrusaderSword.png/80px-CrusaderSword.png",
    "Cutlass": "https://static.wikitide.net/theforgewiki/thumb/1/1e/Cutlass.png/80px-Cutlass.png",
    "Dagger": "https://static.wikitide.net/theforgewiki/thumb/9/99/DaggerIcon.png/80px-DaggerIcon.png",
    "Double Battle Axe": "https://static.wikitide.net/theforgewiki/thumb/0/09/DoubleBattleAxe.png/80px-DoubleBattleAxe.png",
    "Dragon Slayer": "https://static.wikitide.net/theforgewiki/thumb/f/fb/DragonSlayer.png/80px-DragonSlayer.png",
    "Falchion Knife": "https://static.wikitide.net/theforgewiki/thumb/0/02/FalchionKnife.png/80px-FalchionKnife.png",
    "Falchion": "https://static.wikitide.net/theforgewiki/thumb/9/98/FalchionSword.png/80px-FalchionSword.png",
    "Gladius Dagger": "https://static.wikitide.net/theforgewiki/thumb/7/71/GladiusDagger.png/80px-GladiusDagger.png",
    "Gladius": "https://static.wikitide.net/theforgewiki/thumb/9/93/GladiusSword.png/80px-GladiusSword.png",
    "Great Sword": "https://static.wikitide.net/theforgewiki/thumb/2/22/GreatSword.png/80px-GreatSword.png",
    "Hammer": "https://static.wikitide.net/theforgewiki/thumb/8/81/Hammer.png/80px-Hammer.png",
    "Hook": "https://static.wikitide.net/theforgewiki/thumb/4/47/Hook.png/80px-Hook.png",
    "Ironhand": "https://static.wikitide.net/theforgewiki/thumb/7/72/Ironhand.png/80px-Ironhand.png",
    "Long Sword": "https://static.wikitide.net/theforgewiki/thumb/7/73/LongSword.png/80px-LongSword.png",
    "Rapier": "https://static.wikitide.net/theforgewiki/thumb/7/7b/Rapier.png/80px-Rapier.png",
    "Relevator": "https://static.wikitide.net/theforgewiki/thumb/b/bf/Relevator.png/80px-Relevator.png",
    "Scythe": "https://static.wikitide.net/theforgewiki/thumb/c/cd/Scythe.png/80px-Scythe.png",
    "Skull Crusher": "https://static.wikitide.net/theforgewiki/thumb/5/52/SkullCrusher.png/80px-SkullCrusher.png",
    "Tachi": "https://static.wikitide.net/theforgewiki/thumb/5/54/Tachi.png/80px-Tachi.png",
    "Uchigatana": "https://static.wikitide.net/theforgewiki/thumb/4/46/Uchigatana.png/80px-Uchigatana.png",
    "Dark Knight Chestplate": "https://static.wikitide.net/theforgewiki/thumb/e/e6/DarkKnightChestplate.png/64px-DarkKnightChestplate.png",
    "Dark Knight Helmet": "https://static.wikitide.net/theforgewiki/thumb/8/8d/DarkKnightHelmet.png/64px-DarkKnightHelmet.png",
    "Dark Knight Leggings": "https://static.wikitide.net/theforgewiki/thumb/6/65/DarkKnightLeggings.png/64px-DarkKnightLeggings.png",
    "Knight Chestplate": "https://static.wikitide.net/theforgewiki/thumb/d/da/KnightChestplate.png/64px-KnightChestplate.png",
    "Knight Helmet": "https://static.wikitide.net/theforgewiki/thumb/c/c3/KnightHelmet.png/64px-KnightHelmet.png",
    "Knight Leggings": "https://static.wikitide.net/theforgewiki/thumb/a/a4/KnightLeggings.png/64px-KnightLeggings.png",
    "Light Chestplate": "https://static.wikitide.net/theforgewiki/thumb/7/75/LightChestplate.png/64px-LightChestplate.png",
    "Light Helmet": "https://static.wikitide.net/theforgewiki/thumb/d/d6/LightHelmet.png/64px-LightHelmet.png",
    "Light Leggings": "https://static.wikitide.net/theforgewiki/thumb/f/fd/LightLeggings.png/64px-LightLeggings.png",
    "Medium Chestplate": "https://static.wikitide.net/theforgewiki/thumb/a/a0/MediumChestplate.png/64px-MediumChestplate.png",
    "Medium Helmet": "https://static.wikitide.net/theforgewiki/thumb/7/7e/MediumHelmet.png/64px-MediumHelmet.png",
    "Medium Leggings": "https://static.wikitide.net/theforgewiki/thumb/d/d4/MediumLeggings.png/63px-MediumLeggings.png",
    "Samurai Chestplate": "https://static.wikitide.net/theforgewiki/thumb/a/a3/SamuraiChestplate.png/64px-SamuraiChestplate.png",
    "Samurai Helmet": "https://static.wikitide.net/theforgewiki/thumb/b/b8/SamuraiHelmet.png/64px-SamuraiHelmet.png",
    "Samurai Leggings": "https://static.wikitide.net/theforgewiki/thumb/a/a4/SamuraiLeggings.png/63px-SamuraiLeggings.png"
};

