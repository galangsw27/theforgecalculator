import React, { useState, useMemo, useEffect } from 'react';
import { Shield, Sword, Hammer, Sparkles, Trash2, Search, ArrowRight, X, Info, Coins, Zap } from 'lucide-react';
import { ORE_DATA, WEAPON_PROBABILITIES, ARMOR_PROBABILITIES, BASE_ITEM_STATS, ITEM_VARIANTS, BEST_WEAPONS_RECIPES, BEST_ARMOR_RECIPES } from './constants';
import { Ore, Slot, ForgeMode, Area, Trait, ForgedItem } from './types';

// --- Helper Components ---

const RarityBadge = ({ rarity }: { rarity: string }) => {
    const colors: Record<string, string> = {
        common: 'text-gray-400 border-gray-400/20 bg-gray-400/10',
        uncommon: 'text-green-400 border-green-400/20 bg-green-400/10',
        rare: 'text-blue-400 border-blue-400/20 bg-blue-400/10',
        epic: 'text-purple-400 border-purple-400/20 bg-purple-400/10',
        legendary: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',
        mythical: 'text-red-500 border-red-500/20 bg-red-500/10',
        relic: 'text-yellow-200 border-yellow-200/20 bg-yellow-200/10',
    };

    return (
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${colors[rarity] || colors.common}`}>
            {rarity}
        </span>
    );
};

const OreIcon = ({ ore }: { ore: Ore }) => (
    <div
        className="w-10 h-10 rounded-lg shadow-lg flex items-center justify-center bg-black/40 border border-white/10 relative overflow-hidden shrink-0"
        style={{ borderColor: `${ore.color}40` }}
    >
        {ore.image ? (
            <img src={ore.image} alt={ore.name} className="w-full h-full object-cover" />
        ) : (
            <div className="w-5 h-5 rotate-45 transform" style={{ backgroundColor: ore.color }} />
        )}
    </div>
);

// --- Main App ---

export default function App() {
    const [activeTab, setActiveTab] = useState<ForgeMode>('weapon');
    const [activeArea, setActiveArea] = useState<Area>('kingdom');
    const [slots, setSlots] = useState<Slot[]>([
        { id: 1, oreId: null, count: 0 },
        { id: 2, oreId: null, count: 0 },
        { id: 3, oreId: null, count: 0 },
        { id: 4, oreId: null, count: 0 },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isForging, setIsForging] = useState(false);
    const [forgeResult, setForgeResult] = useState<ForgedItem | null>(null);
    const [inventory, setInventory] = useState<ForgedItem[]>([]);
    const [showInventory, setShowInventory] = useState(false);
    const [showBestRecipes, setShowBestRecipes] = useState(false);

    // Theme Colors
    const themeColor = activeTab === 'weapon' ? 'text-weapon' : 'text-armor';
    const themeBg = activeTab === 'weapon' ? 'bg-weapon' : 'bg-armor';
    const themeBorder = activeTab === 'weapon' ? 'border-weapon' : 'border-armor';
    const themeGlow = activeTab === 'weapon' ? 'shadow-weapon-glow' : 'shadow-armor-glow';

    // --- Logic ---

    const oreMix = useMemo(() => {
        return slots
            .filter(s => s.oreId !== null && s.count > 0)
            .map(s => {
                const ore = ORE_DATA.find(o => o.id === s.oreId);
                return { ...s, ore };
            })
            .filter((s): s is Slot & { ore: Ore } => !!s.ore); // Ensure ore is defined
    }, [slots]);

    const totalOres = useMemo(() => oreMix.reduce((a, b) => a + b.count, 0), [oreMix]);

    const totalMultiplier = useMemo(() => {
        if (totalOres === 0) return 0;
        const sum = oreMix.reduce((acc, slot) => acc + (slot.ore.multiplier * slot.count), 0);
        return sum / totalOres;
    }, [oreMix, totalOres]);

    const probabilities = useMemo<Record<string, number>>(() => {
        const table = activeTab === 'weapon' ? WEAPON_PROBABILITIES : ARMOR_PROBABILITIES;
        // Find closest count key
        const counts = Object.keys(table).map(Number).sort((a, b) => a - b);
        let closest = counts[0];
        for (const c of counts) {
            if (Math.abs(c - totalOres) <= Math.abs(closest - totalOres)) {
                closest = c;
            }
        }
        // Use fallback if total ores is very high (cap at max key)
        if (totalOres > counts[counts.length - 1]) closest = counts[counts.length - 1];

        // If totalOres < 3, return empty or base
        if (totalOres < 3) return {};

        return table[closest] || {};
    }, [activeTab, totalOres]);

    const activeTraits = useMemo(() => {
        const traitsList: { oreName: string; description: string; percentage: number; color: string, type: any }[] = [];

        oreMix.forEach(slot => {
            const percentage = (slot.count / totalOres) * 100;
            if (percentage >= 10 && slot.ore.traits.length > 0) {
                slot.ore.traits.forEach(trait => {
                    if (trait.type === 'all' || trait.type === activeTab) {
                        let desc = trait.description;
                        // simple scaling logic
                        for (const [key, rawScale] of Object.entries(trait.scaling)) {
                            const scale = rawScale as { min: number; max: number };
                            let value = scale.min;
                            if (percentage >= 30) value = scale.max;
                            else {
                                const factor = (percentage - 10) / 20;
                                value = scale.min + (scale.max - scale.min) * factor;
                            }
                            desc = desc.replace(`{${key}}`, value.toFixed(1));
                        }
                        traitsList.push({
                            oreName: slot.ore.name,
                            description: desc,
                            percentage,
                            color: slot.ore.color,
                            type: trait.type
                        });
                    }
                });
            }
        });
        return traitsList;
    }, [oreMix, totalOres, activeTab]);

    // --- Actions ---

    const handleAddOre = (ore: Ore) => {
        const newSlots = [...slots];
        const existingSlot = newSlots.find(s => s.oreId === ore.id);

        if (existingSlot) {
            existingSlot.count += 1;
            setSlots(newSlots);
        } else {
            const emptySlot = newSlots.find(s => s.oreId === null);
            if (emptySlot) {
                emptySlot.oreId = ore.id;
                emptySlot.count = 1;
                setSlots(newSlots);
            }
        }
    };

    const updateSlotCount = (id: number, delta: number) => {
        setSlots(prev => prev.map(slot => {
            if (slot.id !== id) return slot;
            const newCount = Math.max(0, slot.count + delta);
            if (newCount === 0) return { ...slot, oreId: null, count: 0 };
            return { ...slot, count: newCount };
        }));
    };

    const handleForge = () => {
        if (totalOres < 3) return;
        setIsForging(true);

        // Simulation
        setTimeout(() => {
            // 1. Determine Type
            let rolledType = Object.keys(probabilities)[0];
            const rand = Math.random();
            let cumulative = 0;
            for (const [type, prob] of Object.entries(probabilities)) {
                cumulative += prob as number;
                if (rand <= cumulative) {
                    rolledType = type;
                    break;
                }
            }

            // 2. Determine Variant with weighted random selection
            let itemName = rolledType;
            const variants = ITEM_VARIANTS[activeTab]?.[rolledType]?.[activeArea];

            // Weighted random selection for variants
            if (variants && variants.length > 0) {
                // Sort variants by probability (descending) to check from rarest to most common
                const sortedVariants = [...variants].sort((a, b) => a.probability - b.probability);

                // Roll for each variant starting from rarest
                for (const variant of sortedVariants) {
                    if (Math.random() <= variant.probability) {
                        itemName = variant.name;
                        break;
                    }
                }
            } else {
                // Find base item name matching type if no variants found (fallback)
                const base = Object.entries(BASE_ITEM_STATS[activeTab]).find(([_, stat]) => stat.type === rolledType);
                if (base) itemName = base[0];
            }

            // 3. Calc Stats
            const baseStats = BASE_ITEM_STATS[activeTab][itemName] || BASE_ITEM_STATS[activeTab][rolledType] || { price: 0, type: rolledType };
            const finalStats = { ...baseStats };

            if (activeTab === 'weapon') {
                finalStats.damage = (baseStats.damage || 0) * totalMultiplier;
                finalStats.price = baseStats.price * totalMultiplier;
            } else {
                finalStats.def = (baseStats.def || 0) * totalMultiplier;
                finalStats.price = baseStats.price * totalMultiplier;
            }

            // 4. Create Result
            const mainOre = oreMix.sort((a, b) => b.count - a.count)[0]?.ore || ORE_DATA[0];

            const result: ForgedItem = {
                id: Date.now(),
                itemName,
                itemType: rolledType,
                multiplier: totalMultiplier,
                mainOre,
                stats: finalStats,
                traits: activeTraits,
                timestamp: new Date().toLocaleTimeString(),
                mode: activeTab
            };

            setForgeResult(result);
            setInventory(prev => [result, ...prev]);
            setIsForging(false);
        }, 1500);
    };

    const areaOres = ORE_DATA.filter(ore => {
        if (searchQuery) return ore.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeArea === 'enemy') return ore.area === 'enemy';
        return ore.area === activeArea;
    });

    return (
        <div className="min-h-screen font-sans text-gray-200 selection:bg-white/20 pb-20">

            {/* --- Header --- */}
            <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Hammer className="text-white" size={18} />
                        </div>
                        <h1 className="font-cinzel font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            The Forge <span className="text-xs text-gray-500 font-sans tracking-normal ml-2">Calculator</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowInventory(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium"
                        >
                            <Coins size={14} className="text-yellow-500" />
                            <span>Inventory ({inventory.length})</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- LEFT COLUMN: Chances --- */}
                <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
                    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <h2 className={`font-cinzel font-bold ${themeColor} flex items-center gap-2`}>
                                <Zap size={16} /> Forge Chances
                            </h2>
                            <span className="text-xs text-gray-500">Based on {totalOres} ores</span>
                        </div>

                        <div className="p-2">
                            <div className="space-y-1">
                                {Object.entries(probabilities).length > 0 ? (
                                    Object.entries(probabilities).map(([type, prob]: [string, number]) => (
                                        <div key={type} className="relative group p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                                            <div className="flex justify-between items-center mb-1 relative z-10">
                                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{type}</span>
                                                <span className={`text-xs font-bold font-mono ${themeColor}`}>{(prob * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${themeBg}`}
                                                    style={{ width: `${prob * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-600 text-sm italic">
                                        Add at least 3 ores to see probabilities.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Preview */}
                    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-xl">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="font-cinzel font-bold text-gray-400 text-sm">Active Traits</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {activeTraits.length > 0 ? (
                                activeTraits.map((t, idx) => (
                                    <div key={idx} className="bg-black/30 border border-white/10 rounded-lg p-3 text-xs">
                                        <div className="flex justify-between mb-1">
                                            <span style={{ color: t.color }} className="font-bold">{t.oreName}</span>
                                            <span className="text-gray-500">{t.percentage.toFixed(0)}%</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">{t.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 text-xs py-4">
                                    No traits active. (Need &gt;10% mix)
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- CENTER COLUMN: The Forge --- */}
                <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">

                    {/* Mode Switcher */}
                    <div className="flex justify-center">
                        <div className="p-1 bg-black/40 border border-white/10 rounded-full flex gap-1 backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('weapon')}
                                className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'weapon' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Sword size={16} /> Weapon
                            </button>
                            <button
                                onClick={() => setActiveTab('armor')}
                                className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'armor' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Shield size={16} /> Armor
                            </button>
                        </div>
                    </div>

                    {/* The Cauldron */}
                    <div className={`relative bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 ${activeTab === 'weapon' ? 'shadow-orange-900/10' : 'shadow-teal-900/10'}`}>

                        {/* Multiplier */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Multiplier</span>
                            <div className={`text-4xl md:text-5xl font-cinzel font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-sm transition-all duration-300 ${totalMultiplier > 0 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
                                {totalMultiplier > 0 ? `${totalMultiplier.toFixed(2)}x` : '0.00x'}
                            </div>
                        </div>

                        {/* Slots */}
                        <div className="mt-20 grid grid-cols-4 gap-3 md:gap-4">
                            {slots.map((slot) => {
                                const slotOre = slot.oreId ? ORE_DATA.find(o => o.id === slot.oreId) : null;
                                const percentage = totalOres > 0 && slotOre ? ((slot.count / totalOres) * 100).toFixed(1) : "0.0";

                                return (
                                    <div
                                        key={slot.id}
                                        className={`
                                    relative aspect-[3/4.5] rounded-xl border-2 transition-all duration-300 group
                                    flex flex-col items-center justify-center p-2 bg-black/40
                                    ${slotOre
                                                ? `shadow-[0_0_15px_-5px_var(--tw-shadow-color)]`
                                                : 'border-dashed border-white/10 hover:border-white/20 hover:bg-white/5'}
                                `}
                                        style={slotOre ? { borderColor: slotOre.color, '--tw-shadow-color': slotOre.color } as React.CSSProperties : {}}
                                    >
                                        {slotOre ? (
                                            <>
                                                <div className="w-12 h-12 mb-2 relative">
                                                    {slotOre.image ? (
                                                        <img src={slotOre.image} className="w-full h-full object-contain drop-shadow-lg" />
                                                    ) : (
                                                        <div className="w-full h-full rounded-md" style={{ backgroundColor: slotOre.color }}></div>
                                                    )}
                                                    <div className="absolute -top-2 -right-2 bg-black border border-white/20 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                                                        {slot.count}
                                                    </div>
                                                </div>
                                                <div className="text-center w-full">
                                                    <div className="text-[10px] font-bold text-white truncate px-1" style={{ color: slotOre.color }}>
                                                        {slotOre.name}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500 mt-0.5">
                                                        {slotOre.multiplier}x
                                                    </div>
                                                    <div className="text-[9px] font-mono text-gray-400 mt-1 bg-white/5 rounded px-1 inline-block">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => updateSlotCount(slot.id, -1)}
                                                    className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 rounded-lg"
                                                >
                                                    <div className="bg-red-500/10 p-2 rounded-full border border-red-500/20">
                                                        <Trash2 size={16} />
                                                    </div>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center text-gray-600">
                                                <div className="text-xs uppercase font-bold tracking-wider">Empty</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => setSlots(slots.map(s => ({ ...s, oreId: null, count: 0 })))}
                                className="px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                            <button
                                onClick={handleForge}
                                disabled={totalOres < 3 || isForging}
                                className={`
                            flex-1 rounded-xl font-cinzel font-bold text-lg tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl
                            ${totalOres >= 3
                                        ? `${themeBg} text-white hover:brightness-110 hover:-translate-y-1 ${themeGlow}`
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                        `}
                            >
                                {isForging ? (
                                    <><Sparkles className="animate-spin" /> FORGING...</>
                                ) : (
                                    <><Hammer className="animate-pulse" /> FORGE ITEM</>
                                )}
                            </button>
                        </div>

                    </div>
                    {/* Best Recipes Section */}
                    <div className="mt-6">
                        <button
                            onClick={() => setShowBestRecipes(!showBestRecipes)}
                            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50"
                        >
                            <Sparkles size={20} />
                            {showBestRecipes ? 'Hide' : 'Show'} Best Recipes
                            <ArrowRight size={16} className={`transition-transform ${showBestRecipes ? 'rotate-90' : ''}`} />
                        </button>

                        {showBestRecipes && (
                            <div className="mt-4 bg-card border border-card-border rounded-xl p-6 shadow-2xl">
                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setActiveTab('weapon')} className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'weapon' ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><Sword size={16} className="inline mr-2" />Weapons</button>
                                    <button onClick={() => setActiveTab('armor')} className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'armor' ? 'bg-teal-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><Shield size={16} className="inline mr-2" />Armor</button>
                                </div>
                                {activeTab === 'weapon' ? (<div className="space-y-6 max-h-[600px] overflow-y-auto">{Object.entries(BEST_WEAPONS_RECIPES).map(([weaponType, recipes]) => (<div key={weaponType} className="bg-black/20 rounded-lg p-4 border border-white/5"><h3 className="text-lg font-cinzel font-bold text-orange-400 mb-3">{weaponType}</h3><div className="space-y-2">{recipes.map((recipe: any, idx: number) => (<div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"><div className="flex justify-between items-start mb-2"><span className="text-sm font-bold text-gray-300">{recipe.tier}</span><div className="flex gap-2"><span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">{recipe.multiplier}x</span><span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded font-mono">{recipe.chance}%</span></div></div><div className="flex flex-wrap gap-2">{recipe.recipe.map((ingredient: any, i: number) => { const ore = ORE_DATA.find(o => o.name === ingredient.ore); return (<div key={i} className="flex items-center gap-1 bg-black/40 rounded px-2 py-1 border border-white/10" style={{ borderColor: ore?.color + '40' }}><div className="w-4 h-4 rounded" style={{ backgroundColor: ore?.color || '#666' }} /><span className="text-xs font-bold" style={{ color: ore?.color }}>{ingredient.count}</span><span className="text-xs text-gray-400">{ingredient.ore}</span></div>); })}</div></div>))}</div></div>))}</div>) : (<div className="space-y-6 max-h-[600px] overflow-y-auto">{Object.entries(BEST_ARMOR_RECIPES).map(([setName, pieces]) => (<div key={setName} className="bg-black/20 rounded-lg p-4 border border-white/5"><h3 className="text-lg font-cinzel font-bold text-teal-400 mb-3">{setName}</h3><div className="space-y-2">{pieces.map((recipe: any, idx: number) => (<div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"><div className="flex justify-between items-start mb-2"><span className="text-sm font-bold text-gray-300">{recipe.piece}</span><div className="flex gap-2"><span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">{recipe.multiplier}x</span><span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded font-mono">{recipe.chance}%</span></div></div><div className="flex flex-wrap gap-2">{recipe.recipe.map((ingredient: any, i: number) => { const ore = ORE_DATA.find(o => o.name === ingredient.ore); return (<div key={i} className="flex items-center gap-1 bg-black/40 rounded px-2 py-1 border border-white/10" style={{ borderColor: ore?.color + '40' }}><div className="w-4 h-4 rounded" style={{ backgroundColor: ore?.color || '#666' }} /><span className="text-xs font-bold" style={{ color: ore?.color }}>{ingredient.count}</span><span className="text-xs text-gray-400">{ingredient.ore}</span></div>); })}</div></div>))}</div></div>))}</div>)}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Ore Selection --- */}
                <div className="lg:col-span-3 h-[600px] lg:h-auto flex flex-col gap-4 order-3">

                    {/* Search & Filter */}
                    <div className="bg-card border border-card-border rounded-xl p-4 space-y-4 shadow-lg">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                            <input
                                type="text"
                                placeholder="Search ores..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-600"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {(['stonewake', 'kingdom', 'goblin', 'enemy'] as Area[]).map(area => (
                                <button
                                    key={area}
                                    onClick={() => setActiveArea(area)}
                                    className={`
                                px-3 py-1 text-xs font-bold uppercase rounded-md whitespace-nowrap border transition-all
                                ${activeArea === area
                                            ? 'bg-white/10 text-white border-white/20'
                                            : 'text-gray-600 border-transparent hover:text-gray-400'}
                            `}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ore Grid */}
                    <div className="flex-1 bg-card border border-card-border rounded-xl overflow-hidden shadow-lg flex flex-col">
                        <div className="flex-1 overflow-y-auto p-2 grid grid-cols-4 gap-2 content-start">
                            {areaOres.map(ore => (
                                <button
                                    key={ore.id}
                                    onClick={() => handleAddOre(ore)}
                                    className="group flex flex-col items-center p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />

                                    <OreIcon ore={ore} />

                                    <div className="mt-1 text-center w-full">
                                        <div className="text-[9px] font-bold truncate leading-tight w-full" style={{ color: ore.color }} title={ore.name}>
                                            {ore.name}
                                        </div>
                                        <div className="text-[8px] text-gray-500">{ore.multiplier}x</div>
                                    </div>
                                </button>
                            ))}
                            {areaOres.length === 0 && (
                                <div className="col-span-4 p-8 text-center text-gray-600 text-sm">
                                    No ores found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>

            {/* --- MODAL: Forge Result --- */}
            {forgeResult && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-card border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
                        {/* Glow Effect based on main ore color */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: forgeResult.mainOre.color }} />

                        <button onClick={() => setForgeResult(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">
                            <X size={20} />
                        </button>

                        <div className="p-8 text-center overflow-y-auto custom-scrollbar">
                            <div className="mb-6 flex justify-center">
                                <div
                                    className="w-24 h-24 rounded-xl shadow-[0_0_30px_-5px_var(--glow)] flex items-center justify-center bg-black border border-white/10 relative"
                                    style={{ '--glow': forgeResult.mainOre.color } as React.CSSProperties}
                                >
                                    <div className="absolute inset-0 bg-white/5 rounded-xl" />
                                    {ITEM_VARIANTS[activeTab]?.[forgeResult.itemType]?.[activeArea]?.find(v => v.name === forgeResult.itemName) ? (
                                        <div className="text-4xl">⚔️</div> // Placeholder for item variant image
                                    ) : (
                                        <div className="text-4xl" style={{ color: forgeResult.mainOre.color }}>
                                            {activeTab === 'weapon' ? <Sword size={40} /> : <Shield size={40} />}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-2xl font-cinzel font-bold text-white mb-1">{forgeResult.itemName}</h2>
                            <div className="text-sm text-gray-500 uppercase tracking-widest mb-6 font-bold">{forgeResult.itemType}</div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {Object.entries(forgeResult.stats).filter(([k]) => k !== 'type').map(([key, value]) => (
                                    <div key={key} className="bg-white/5 rounded-lg p-2 border border-white/5">
                                        <div className="text-[10px] uppercase text-gray-500 font-bold mb-0.5">{key}</div>
                                        <div className="text-lg font-bold text-white">
                                            {typeof value === 'number' ? value.toFixed(key === 'atkSpeed' ? 2 : 0) : value}
                                            {key === 'atkSpeed' && 's'}
                                            {key === 'health' && '%'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Traits Section */}
                            {forgeResult.traits.length > 0 && (
                                <div className="mb-6 text-left bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h3 className="text-xs uppercase text-gray-500 font-bold mb-3 flex items-center gap-2">
                                        <Sparkles size={12} className="text-yellow-500" /> Active Traits
                                    </h3>
                                    <div className="space-y-3">
                                        {forgeResult.traits.map((t, i) => (
                                            <div key={i} className="text-sm border-l-2 pl-3 py-0.5" style={{ borderColor: t.color }}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span style={{ color: t.color }} className="font-bold">{t.oreName}</span>
                                                    <span className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400">{t.percentage.toFixed(0)}%</span>
                                                </div>
                                                <p className="text-gray-300 text-xs leading-relaxed opacity-90">{t.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 justify-center mt-4">
                                <button
                                    onClick={() => { setForgeResult(null); handleForge(); }}
                                    className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors w-full"
                                >
                                    Forge Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL: Inventory --- */}
            {showInventory && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
                    <div className="bg-card border border-card-border rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl relative">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-cinzel font-bold flex items-center gap-2">
                                <Coins className="text-yellow-500" /> Forge History
                            </h2>
                            <button onClick={() => setShowInventory(false)} className="text-gray-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {inventory.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {inventory.map(item => (
                                        <div key={item.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-white/20 transition-colors">
                                            <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 flex items-center justify-center border border-white/5">
                                                {item.mode === 'weapon' ? <Sword size={24} className="text-gray-500" /> : <Shield size={24} className="text-gray-500" />}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-white truncate">{item.itemName}</div>
                                                <div className="text-xs text-gray-500 mb-2">{item.timestamp}</div>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                                                        {item.multiplier.toFixed(2)}x
                                                    </span>
                                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 truncate max-w-[100px]">
                                                        {item.mainOre.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                    <Sword size={48} className="mb-4 opacity-20" />
                                    <p>No items forged yet.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20 rounded-b-2xl">
                            <div className="text-sm text-gray-500">
                                Total Value: <span className="text-yellow-500 font-bold">${inventory.reduce((a, b) => a + (b.stats.price || 0), 0).toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => setInventory([])}
                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                            >
                                <Trash2 size={12} /> Clear History
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}