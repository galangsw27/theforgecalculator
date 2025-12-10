import { Ore, ItemStat } from './types';

export const ORE_DATA: Ore[] = [
    // Stonewake's Cross
    { id: 1, name: "Stone", multiplier: 0.2, rarity: "common", area: "stonewake", color: "#7b7773", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/stone-the-forge-calculator.png" },
    { id: 2, name: "Sand Stone", multiplier: 0.25, rarity: "common", area: "stonewake", color: "#c3a777", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/sand-stone-the-forge-calculator.png" },
    { id: 3, name: "Copper", multiplier: 0.3, rarity: "common", area: "stonewake", color: "#925d3e", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/copper-the-forge-calculator.png" },
    { id: 4, name: "Iron", multiplier: 0.35, rarity: "common", area: "stonewake", color: "#827356", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/iron-the-forge-calculator.png" },
    { id: 5, name: "Tin", multiplier: 0.425, rarity: "uncommon", area: "stonewake", color: "#69707b", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/tin-the-forge-calculator.png" },
    { id: 6, name: "Silver", multiplier: 0.5, rarity: "uncommon", area: "stonewake", color: "#bad0e0", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/silver-the-forge-calculator.png" },
    { id: 7, name: "Gold", multiplier: 0.65, rarity: "uncommon", area: "stonewake", color: "#c89d40", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/gold-the-forge-calculator.png" },
    { id: 8, name: "Mushroomite", multiplier: 0.8, rarity: "rare", area: "stonewake", color: "#9b8768", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/mushroomite-the-forge-calculator.png" },
    { id: 9, name: "Platinum", multiplier: 0.8, rarity: "rare", area: "stonewake", color: "#d6dee6", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/platinum-the-forge-calculator.png" },
    { id: 10, name: "Bananite", multiplier: 0.85, rarity: "uncommon", area: "stonewake", color: "#edbe70", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/bananite-the-forge-calculator.png" },
    { id: 11, name: "Cardboardite", multiplier: 0.7, rarity: "common", area: "stonewake", color: "#a28161", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/carboardite-the-forge-calculator.png" },
    { id: 12, name: "Aite", multiplier: 1.0, rarity: "epic", area: "stonewake", color: "#f0d2a7", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/aite-the-forge-calculator.png" },
    {
        id: 13, name: "Poopite", multiplier: 1.2, rarity: "epic", area: "stonewake", color: "#5f4937", traitType: "all", traits: [
            {
                description: "Deal {damage}% Poison DMG in AoE for {duration}s. Activates when HP < 35%.",
                scaling: { damage: { min: 1.5, max: 15 }, duration: { min: 0.5, max: 5 } }, type: "all"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/poopite-the-forge-calculator.png"
    },
    // Forgotten Kingdom
    { id: 14, name: "Cobalt", multiplier: 1.0, rarity: "uncommon", area: "kingdom", color: "#579de7", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/cobalt-the-forge-calculator.png" },
    { id: 15, name: "Titanium", multiplier: 1.15, rarity: "uncommon", area: "kingdom", color: "#aca895", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/titanium-the-forge-calculator.png" },
    { id: 16, name: "Volcanic Rock", multiplier: 1.55, rarity: "rare", area: "kingdom", color: "#504b44", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/volcanic-rock-the-forge-calculator.png" },
    { id: 17, name: "Lapis Lazuli", multiplier: 1.3, rarity: "uncommon", area: "kingdom", color: "#5c89dc", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/lapis-lazuli-the-forge-calculator.png" },
    { id: 18, name: "Quartz", multiplier: 1.5, rarity: "rare", area: "kingdom", color: "#b6dffd", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/quartz-the-forge-calculator.png" },
    { id: 19, name: "Amethyst", multiplier: 1.65, rarity: "rare", area: "kingdom", color: "#957aed", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/amethyst-the-forge-calculator.png" },
    { id: 20, name: "Topaz", multiplier: 1.75, rarity: "rare", area: "kingdom", color: "#deb7a4", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/topaz-the-forge-calculator.png" },
    { id: 21, name: "Diamond", multiplier: 2.0, rarity: "rare", area: "kingdom", color: "#aef8fa", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/diamond-the-forge-calculator.png" },
    { id: 22, name: "Sapphire", multiplier: 2.25, rarity: "rare", area: "kingdom", color: "#7bbdfa", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/sapphire-the-forge-calculator.png" },
    { id: 23, name: "Cuprite", multiplier: 2.43, rarity: "epic", area: "kingdom", color: "#7a3034", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/cuprite-the-forge-calculator.png" },
    {
        id: 24, name: "Obsidian", multiplier: 2.35, rarity: "epic", area: "kingdom", color: "#4b2e87", traitType: "armor", traits: [
            { description: "+{health}% extra health.", scaling: { health: { min: 3, max: 30 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/obsidian-the-forge-calculator.png"
    },
    { id: 25, name: "Emerald", multiplier: 2.55, rarity: "epic", area: "kingdom", color: "#5fb172", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/emerald-the-forge-calculator.png" },
    { id: 26, name: "Ruby", multiplier: 2.95, rarity: "epic", area: "kingdom", color: "#cc4a53", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/ruby-the-forge-calculator.png" },
    {
        id: 27, name: "Rivalite", multiplier: 3.33, rarity: "epic", area: "kingdom", color: "#8e4a4c", traitType: "weapon", traits: [
            { description: "+{crit}% critical chance.", scaling: { crit: { min: 2, max: 20 } }, type: "weapon" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/rivalite-the-forge-calculator.png"
    },
    {
        id: 28, name: "Uranium", multiplier: 3.0, rarity: "legendary", area: "kingdom", color: "#97c889", traitType: "armor", traits: [
            { description: "Deal {damage}% of max health as AoE DMG while in-combat.", scaling: { damage: { min: 0.5, max: 5 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/uranium-the-forge-calculator.png"
    },
    {
        id: 29, name: "Mythril", multiplier: 3.5, rarity: "legendary", area: "kingdom", color: "#9f61fa", traitType: "armor", traits: [
            { description: "+{health}% extra health.", scaling: { health: { min: 1.5, max: 15 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/mythril-the-forge-calculator.png"
    },
    {
        id: 30, name: "Eye Ore", multiplier: 4.0, rarity: "legendary", area: "kingdom", color: "#fab67f", traitType: "all", traits: [
            {
                description: "Increase physical damage by +{damage}% and decrease health by -{health}%.",
                scaling: { damage: { min: 1.5, max: 15 }, health: { min: 1, max: 10 } }, type: "all"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/eye-ore-the-forge-calculator.png"
    },
    {
        id: 31, name: "Fireite", multiplier: 4.5, rarity: "legendary", area: "kingdom", color: "#a4532e", traitType: "weapon", traits: [
            {
                description: "Deals {damage}% of weapon damage as fire per second for 2 seconds.",
                scaling: { damage: { min: 2, max: 20 } }, type: "weapon"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/fireite-the-forge-calculator.png"
    },
    {
        id: 32, name: "Magmaite", multiplier: 5.0, rarity: "legendary", area: "kingdom", color: "#f77b61", traitType: "weapon", traits: [
            {
                description: "Cause an explosion on hit, dealing {damage}% of weapon damage as AoE damage.",
                scaling: { damage: { min: 5, max: 50 } }, type: "weapon"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/magmaite-the-forge-calculator.png"
    },
    {
        id: 33, name: "Lightite", multiplier: 4.6, rarity: "legendary", area: "kingdom", color: "#9ac9fa", traitType: "armor", traits: [
            { description: "+{speed}% extra movement speed.", scaling: { speed: { min: 1.5, max: 15 } }, type: "armor" }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/lightite-the-forge-calculator.png"
    },
    {
        id: 34, name: "Demonite", multiplier: 5.5, rarity: "mythical", area: "kingdom", color: "#7d1b1d", traitType: "armor", traits: [
            {
                description: "Deals {damage}% of weapon damage as fire per second for 2 seconds. 15% chance.",
                scaling: { damage: { min: 2, max: 20 } }, type: "armor"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/demonite-the-forge-calculator.png"
    },
    {
        id: 35, name: "Darkryte", multiplier: 6.3, rarity: "mythical", area: "kingdom", color: "#f0f0f0", traitType: "armor", traits: [
            {
                description: "Upon taking damage, there is a {chance}% chance to turn into a shadow and dodge.",
                scaling: { chance: { min: 1.5, max: 15 } }, type: "armor"
            }
        ],
        image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/darkryte-the-forge-calculator.png"
    },
    { id: 36, name: "Magenta Crystal", multiplier: 3.1, rarity: "epic", area: "goblin", color: "#795ef8", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/magenta-crystal-the-forge-calculator.png" },
    { id: 37, name: "Crimson Crystal", multiplier: 3.3, rarity: "epic", area: "goblin", color: "#9a5065", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/crimson-crystal-the-forge-calculator.png" },
    { id: 38, name: "Green Crystal", multiplier: 3.2, rarity: "epic", area: "goblin", color: "#68c87b", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/green-crystal-the-forge-calculator.png" },
    { id: 39, name: "Orange Crystal", multiplier: 3.0, rarity: "epic", area: "goblin", color: "#d8792a", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/orange-crystal-the-forge-calculator.png" },
    { id: 40, name: "Blue Crystal", multiplier: 3.4, rarity: "epic", area: "goblin", color: "#699cf1", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/blue-crystal-the-forge-calculator.png" },
    { id: 41, name: "Rainbow Crystal", multiplier: 5.25, rarity: "legendary", area: "goblin", color: "#1b7c3a", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/rainbow-crystal-the-forge-calculator.png" },
    { id: 42, name: "Arcane Crystal", multiplier: 7.5, rarity: "mythical", area: "goblin", color: "#c8dbf5", traitType: null, traits: [], image: "https://cms.bloxinformer.com/wp-content/uploads/2025/04/arcane-crystal-the-forge-calculator.png" }
];

export const WEAPON_PROBABILITIES: Record<number, Record<string, number>> = {
    3: { "Dagger": 1.0 },
    4: { "Dagger": 0.86, "Straight Sword": 0.14 },
    5: { "Dagger": 0.35, "Straight Sword": 0.65 },
    6: { "Dagger": 0.14, "Straight Sword": 0.86 },
    7: { "Dagger": 0.06, "Straight Sword": 0.74, "Gauntlet": 0.2 },
    8: { "Dagger": 0.02, "Straight Sword": 0.44, "Gauntlet": 0.54 },
    9: { "Dagger": 0.01, "Straight Sword": 0.24, "Gauntlet": 0.65, "Katana": 0.1 },
    10: { "Straight Sword": 0.11, "Gauntlet": 0.47, "Katana": 0.42 },
    11: { "Straight Sword": 0.05, "Gauntlet": 0.32, "Katana": 0.63 },
    12: { "Straight Sword": 0.03, "Gauntlet": 0.22, "Katana": 0.72, "Great Sword": 0.03 },
    13: { "Straight Sword": 0.01, "Gauntlet": 0.15, "Katana": 0.62, "Great Sword": 0.22 },
    14: { "Straight Sword": 0.01, "Gauntlet": 0.08, "Katana": 0.46, "Great Sword": 0.45 },
    15: { "Gauntlet": 0.05, "Katana": 0.35, "Great Sword": 0.6 },
    16: { "Gauntlet": 0.03, "Katana": 0.26, "Great Sword": 0.70, "Great Axe": 0.01 },
    17: { "Gauntlet": 0.02, "Katana": 0.19, "Great Sword": 0.68, "Great Axe": 0.11 },
    18: { "Gauntlet": 0.02, "Katana": 0.13, "Great Sword": 0.57, "Great Axe": 0.28 },
    19: { "Gauntlet": 0.01, "Katana": 0.08, "Great Sword": 0.46, "Great Axe": 0.45 },
    20: { "Gauntlet": 0.01, "Katana": 0.06, "Great Sword": 0.36, "Great Axe": 0.57 },
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
        "Comically Large Spoon": { damage: 36, atkSpeed: 1.12, range: 10, price: 1355, type: "Colossal Sword" }
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
        "Dark Knight Chestplate": { health: 25, price: 1626, def: 50, type: "Heavy Chestplate" }
    }
};

export const ITEM_VARIANTS: Record<string, Record<string, Record<string, { name: string, chance: string, probability: number }[]>>> = {
    weapon: {
        "Dagger": {
            "kingdom": [
                { name: "Dagger", chance: "1/1", probability: 1.0 },
                { name: "Falchion Knife", chance: "1/2", probability: 0.5 },
                { name: "Gladius Dagger", chance: "1/4", probability: 0.25 },
                { name: "Hook", chance: "1/16", probability: 0.0625 }
            ]
        },
        "Straight Sword": {
            "kingdom": [
                { name: "Falchion", chance: "1/1", probability: 1.0 },
                { name: "Gladius", chance: "1/2", probability: 0.5 },
                { name: "Cutlass", chance: "1/4", probability: 0.25 },
                { name: "Rapier", chance: "1/8", probability: 0.125 },
                { name: "Chaos", chance: "1/16", probability: 0.0625 }
            ]
        },
        "Gauntlet": {
            "kingdom": [
                { name: "Ironhand", chance: "1/1", probability: 1.0 },
                { name: "Boxing Gloves", chance: "1/4", probability: 0.25 },
                { name: "Relevator", chance: "1/16", probability: 0.0625 }
            ]
        },
        "Katana": {
            "kingdom": [
                { name: "Uchigatana", chance: "1/1", probability: 1.0 },
                { name: "Tachi", chance: "1/2", probability: 0.5 }
            ]
        },
        "Great Sword": {
            "kingdom": [
                { name: "Crusader Sword", chance: "1/1", probability: 1.0 },
                { name: "Long Sword", chance: "1/2", probability: 0.5 }
            ]
        },
        "Great Axe": {
            "kingdom": [
                { name: "Double Battle Axe", chance: "1/1", probability: 1.0 },
                { name: "Scythe", chance: "1/2", probability: 0.5 }
            ]
        },
        "Colossal Sword": {
            "kingdom": [
                { name: "Great Sword", chance: "1/1", probability: 1.0 },
                { name: "Hammer", chance: "1/2", probability: 0.5 },
                { name: "Skull Crusher", chance: "1/2", probability: 0.5 },
                { name: "Dragon Slayer", chance: "1/3", probability: 0.333 },
                { name: "Comically Large Spoon", chance: "1/16", probability: 0.0625 }
            ]
        }
    },
    armor: {
        "Light Helmet": {
            "kingdom": [
                { name: "Light Helmet", chance: "1/1", probability: 1.0 }
            ]
        },
        "Light Leggings": {
            "kingdom": [
                { name: "Light Leggings", chance: "1/2", probability: 0.5 }
            ]
        },
        "Light Chestplate": {
            "kingdom": [
                { name: "Light Chestplate", chance: "1/3", probability: 0.333 }
            ]
        },
        "Medium Helmet": {
            "kingdom": [
                { name: "Medium Helmet", chance: "1/1", probability: 1.0 },
                { name: "Samurai Helmet", chance: "1/5", probability: 0.2 }
            ]
        },
        "Medium Leggings": {
            "kingdom": [
                { name: "Medium Leggings", chance: "1/2", probability: 0.5 },
                { name: "Samurai Leggings", chance: "1/5", probability: 0.2 }
            ]
        },
        "Medium Chestplate": {
            "kingdom": [
                { name: "Medium Chestplate", chance: "1/3", probability: 0.333 },
                { name: "Samurai Chestplate", chance: "1/5", probability: 0.2 }
            ]
        },
        "Heavy Helmet": {
            "kingdom": [
                { name: "Knight Helmet", chance: "1/1", probability: 1.0 },
                { name: "Dark Knight Helmet", chance: "1/1", probability: 1.0 }
            ]
        },
        "Heavy Leggings": {
            "kingdom": [
                { name: "Knight Leggings", chance: "1/2", probability: 0.5 },
                { name: "Dark Knight Leggings", chance: "1/2", probability: 0.5 }
            ]
        },
        "Heavy Chestplate": {
            "kingdom": [
                { name: "Knight Chestplate", chance: "1/3", probability: 0.333 },
                { name: "Dark Knight Chestplate", chance: "1/3", probability: 0.333 }
            ]
        }
    }
};

// Best Weapons Recipes
export const BEST_WEAPONS_RECIPES = {
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

