import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Sword, Hammer, Sparkles, Trash2, Search, ArrowRight, X, Coins, Zap, Home, ExternalLink, Save, Crown, Download, Menu, ChevronLeft, ChevronRight, Heart, Book } from 'lucide-react';
import { supabase } from './src/lib/supabaseClient';
import ChatBot from './src/components/ChatBot';
import LandingPage from './src/components/LandingPage';
import { LanguageProvider, useLanguage, LanguageSwitcher } from './src/context/LanguageContext';
import { ORE_DATA, WEAPON_PROBABILITIES, ARMOR_PROBABILITIES, BASE_ITEM_STATS, ITEM_VARIANTS, BEST_WEAPONS_RECIPES, BEST_ARMOR_RECIPES, ITEM_IMAGES, WORLD_WEAPON_DATA } from './constants';
import { Ore, Slot, ForgeMode, Area, ForgedItem, Rune, World } from './types';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Login from './src/components/Auth/Login';
import Signup from './src/components/Auth/Signup';
import DamageTester from './src/components/DamageTester';
import PrivateServerTutorial from './src/components/PrivateServerTutorial';
import runesData from './src/data/runes.json';
import WikiLayout from './src/components/Wiki/WikiLayout';
import WikiHome from './src/components/Wiki/WikiHome';
import WikiOres from './src/components/Wiki/WikiOres';
import WikiWeapons from './src/components/Wiki/WikiWeapons';
import WikiArmor from './src/components/Wiki/WikiArmor';
import WikiGuides from './src/components/Wiki/WikiGuides';

// --- Helper Components ---

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

// --- Calculator Component ---
function Calculator() {
    const { t } = useLanguage();
    const { user, profile, refreshProfile, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState<ForgeMode>('weapon');
    const [activeArea, setActiveArea] = useState<Area>('frostpire');
    const [activeWorld, setActiveWorld] = useState<World>('W1');
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
    const [savedBuilds, setSavedBuilds] = useState<any[]>([]);
    const [showSavedBuilds, setShowSavedBuilds] = useState(false);
    const [showRuneModal, setShowRuneModal] = useState(false);
    const [selectedRuneSlot, setSelectedRuneSlot] = useState<number | null>(null);

    const [viewingBuildId, setViewingBuildId] = useState<number | null>(null); // To track which build we are enhancing in the modal
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabsRef = React.useRef<HTMLDivElement>(null);

    const scrollTabs = (direction: 'left' | 'right') => {
        if (tabsRef.current) {
            const scrollAmount = 150;
            tabsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (user) {
            fetchSavedBuilds();
        } else {
            setSavedBuilds([]);
        }
    }, [user]);

    const fetchSavedBuilds = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase
            .from('builds')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setSavedBuilds(data);
        }
    };

    const handleSaveBuild = async () => {
        if (!user) {
            alert("Please login to save builds.");
            return;
        }
        if (!forgeResult) return;

        const buildName = prompt("Enter a name for this build:", forgeResult.itemName);
        if (!buildName) return;

        const { error } = await supabase
            .from('builds')
            .insert({
                user_id: user.id,
                name: buildName,
                build_data: forgeResult
            });

        if (error) {
            alert("Error saving build: " + error.message);
        } else {
            alert("Build saved successfully!");
            fetchSavedBuilds();
        }
    };



    const loadBuild = (build: any) => {
        setForgeResult(build.build_data);
        setShowSavedBuilds(false);
    };

    const deleteBuild = async (id: number) => {
        if (!confirm("Are you sure you want to delete this build?")) return;
        const { error } = await supabase
            .from('builds')
            .delete()
            .eq('id', id);
        if (!error) {
            fetchSavedBuilds();
        }
    };

    // Theme Colors
    const themeColor = activeTab === 'weapon' ? 'text-weapon' : 'text-armor';
    const themeBg = activeTab === 'weapon' ? 'bg-weapon' : 'bg-armor';
    const themeGlow = activeTab === 'weapon' ? 'shadow-weapon-glow' : 'shadow-armor-glow';

    // --- Logic ---
    const oreMix = useMemo(() => {
        return slots
            .filter(s => s.oreId !== null && s.count > 0)
            .map(s => {
                const ore = ORE_DATA.find(o => o.id === s.oreId);
                return { ...s, ore };
            })
            .filter((s): s is Slot & { ore: Ore } => !!s.ore);
    }, [slots]);

    const totalOres = useMemo(() => oreMix.reduce((a, b) => a + b.count, 0), [oreMix]);

    const totalMultiplier = useMemo(() => {
        if (totalOres === 0) return 0;
        const sum = oreMix.reduce((acc, slot) => acc + (slot.ore.multiplier * slot.count), 0);
        return sum / totalOres;
    }, [oreMix, totalOres]);

    const probabilities = useMemo<Record<string, number>>(() => {
        const counts = Object.keys(activeTab === 'weapon' ? WORLD_WEAPON_DATA : ARMOR_PROBABILITIES).map(Number).sort((a, b) => a - b);
        let closest = counts[0];
        for (const c of counts) {
            if (Math.abs(c - totalOres) <= Math.abs(closest - totalOres)) {
                closest = c;
            }
        }
        if (totalOres > counts[counts.length - 1]) closest = counts[counts.length - 1];
        if (totalOres < 3) return {};

        if (activeTab === 'weapon') {
            const tiers = Object.keys(WEAPON_PROBABILITIES).map(Number).sort((a, b) => a - b);
            const baseProbs = WEAPON_PROBABILITIES[closest] || {};
            const worldVariants = WORLD_WEAPON_DATA[closest]?.[activeWorld] || {};

            // 1. World-exclusive types mapping
            const worldExclusives: Record<string, World[]> = {
                "Gauntlet": ["W1", "W2"],
                "Mace": ["W3"],
                "Katana": ["W1", "W2"],
                "Axe": ["W3"],
                "Great Sword": ["W1", "W2"],
                "Spear": ["W3"]
            };

            // 2. Map weapon types to their "optimal" tier (maxOre)
            const typeToMaxOre: Record<string, number> = {
                "Dagger": 3, "Straight Sword": 6, "Gauntlet": 9, "Mace": 9,
                "Katana": 12, "Axe": 12, "Great Sword": 16, "Spear": 16,
                "Great Axe": 22, "Colossal Sword": 49
            };

            const mainWeights: Record<string, number> = {};
            const offTargetWeights: Record<string, number> = {};
            let totalMainBaseProb = 0;
            let totalOffTargetBaseProb = 0;

            Object.entries(baseProbs).forEach(([type, prob]) => {
                // Skip if exclusive to other worlds
                if (worldExclusives[type] && !worldExclusives[type].includes(activeWorld)) return;

                const maxOre = typeToMaxOre[type] || closest;
                // Infinite scaling for Colossal Sword (highest tier)
                let scalingFactor = totalOres <= maxOre ? totalOres / maxOre : (type === "Colossal Sword" ? totalOres / maxOre : maxOre / totalOres);
                const scaledProb = prob * scalingFactor;

                const variants = Object.entries(worldVariants).filter(([name]) => {
                    const itemType = BASE_ITEM_STATS.weapon[name]?.type || name;
                    return itemType === type;
                });

                if (variants.length > 0) {
                    // This is a "main" weapon type for this tier if it has variants
                    // We use the base scaled probability as the target for this group
                    let totalVariantBaseProb = variants.reduce((acc, [, vProb]) => acc + vProb, 0);
                    variants.forEach(([name, vProb]) => {
                        const normalizedVProb = vProb / totalVariantBaseProb;
                        mainWeights[name] = scaledProb * normalizedVProb;
                    });
                    totalMainBaseProb += scaledProb;
                } else {
                    offTargetWeights[type] = scaledProb;
                    totalOffTargetBaseProb += scaledProb;
                }
            });

            // 3. Target-based Normalization
            const finalProbs: Record<string, number> = {};

            // We want main weapons to keep their exact scaled base probability
            // and other available weapons to fill the remaining gap to 100%
            // Cap totalMainBaseProb at 1.0 for end-game scaling
            const cappedTotalMainBaseProb = Math.min(1.0, totalMainBaseProb);
            const remainingProb = 1.0 - cappedTotalMainBaseProb;

            if (cappedTotalMainBaseProb > 0) {
                const mainScale = totalMainBaseProb > 1.0 ? 1.0 / totalMainBaseProb : 1.0;
                Object.entries(mainWeights).forEach(([name, weight]) => {
                    finalProbs[name] = weight * mainScale;
                });

                if (remainingProb > 0 && totalOffTargetBaseProb > 0) {
                    const offTargetScale = remainingProb / totalOffTargetBaseProb;
                    Object.entries(offTargetWeights).forEach(([name, weight]) => {
                        finalProbs[name] = (finalProbs[name] || 0) + weight * offTargetScale;
                    });
                } else if (remainingProb > 0) {
                    // If no off-target weapons but we have remaining prob, 
                    // normalize main weapons to 100%
                    const mainScale = 1.0 / totalMainBaseProb;
                    Object.entries(mainWeights).forEach(([name, weight]) => {
                        finalProbs[name] = weight * mainScale;
                    });
                }
            } else if (totalOffTargetBaseProb > 0) {
                // No main weapons, normalize off-target to 1.0
                const offTargetScale = 1.0 / totalOffTargetBaseProb;
                Object.entries(offTargetWeights).forEach(([name, weight]) => {
                    finalProbs[name] = weight * offTargetScale;
                });
            }

            return finalProbs;
        }
        return ARMOR_PROBABILITIES[closest] || {};
    }, [activeTab, totalOres, activeWorld]);

    const groupedProbabilities = useMemo(() => {
        const groups: Record<string, { total: number; variants: { name: string; chance: number; displayChance: string }[] }> = {};

        Object.entries(probabilities).forEach(([name, prob]) => {
            const type = activeTab === 'weapon' ? (BASE_ITEM_STATS.weapon[name]?.type || name) : name;
            if (!groups[type]) {
                groups[type] = { total: 0, variants: [] };
            }
            groups[type].total += prob;

            // Find the display chance (e.g., "1/1", "1/8") from ITEM_VARIANTS or WORLD_WEAPON_DATA logic
            let displayChance = "1/1";
            if (activeTab === 'weapon') {
                const areaVariants = ITEM_VARIANTS.weapon[type]?.[activeArea] || [];
                const variant = areaVariants.find(v => v.name === name);
                if (variant) {
                    displayChance = variant.chance;
                }
            }

            groups[type].variants.push({ name, chance: prob, displayChance });
        });

        return groups;
    }, [probabilities, activeTab, activeArea]);

    const activeTraits = useMemo(() => {
        const traitsList: { oreName: string; description: string; percentage: number; color: string, type: any }[] = [];
        oreMix.forEach(slot => {
            const percentage = (slot.count / totalOres) * 100;
            if (percentage >= 10 && slot.ore.traits.length > 0) {
                slot.ore.traits.forEach(trait => {
                    if (trait.type === 'all' || trait.type === activeTab) {
                        let desc = trait.description;
                        const scalingValues: Record<string, number> = {};
                        for (const [key, rawScale] of Object.entries(trait.scaling)) {
                            const scale = rawScale as { min: number; max: number };
                            let value = scale.min;
                            if (percentage >= 30) value = scale.max;
                            else {
                                const factor = (percentage - 10) / 20;
                                value = scale.min + (scale.max - scale.min) * factor;
                            }
                            scalingValues[key] = value;
                            desc = desc.replace(`{${key}}`, value.toFixed(1));
                        }
                        traitsList.push({
                            oreName: slot.ore.name,
                            description: desc,
                            percentage,
                            color: slot.ore.color,
                            type: trait.type,
                            scalingValues
                        } as any);
                    }
                });
            }
        });
        return traitsList;
    }, [oreMix, totalOres, activeTab]);

    const handleEnhance = async (buildId: number, delta: number = 1) => {
        if (!user) return;
        const build = savedBuilds.find(b => b.id === buildId);
        if (!build) return;

        const currentLevel = build.build_data.enhancementLevel || 0;
        const newLevel = Math.max(0, currentLevel + delta);

        // Update local state for immediate feedback
        const updatedBuildData = {
            ...build.build_data,
            enhancementLevel: newLevel
        };

        const { error } = await supabase
            .from('builds')
            .update({ build_data: updatedBuildData })
            .eq('id', buildId);

        if (!error) {
            fetchSavedBuilds();
        } else {
            alert("Error enhancing: " + error.message);
        }
    };

    const handleEquipRune = async (rune: Rune) => {
        if (!user || viewingBuildId === null || selectedRuneSlot === null) return;
        const build = savedBuilds.find(b => b.id === viewingBuildId);
        if (!build) return;

        const currentRunes = build.build_data.equippedRunes || [];
        const newRunes = [...currentRunes];

        // Ensure array is big enough
        while (newRunes.length <= selectedRuneSlot) {
            newRunes.push(null as any);
        }
        newRunes[selectedRuneSlot] = rune;

        const updatedBuildData = {
            ...build.build_data,
            equippedRunes: newRunes
        };

        const { error } = await supabase
            .from('builds')
            .update({ build_data: updatedBuildData })
            .eq('id', viewingBuildId);

        if (!error) {
            fetchSavedBuilds();
            setShowRuneModal(false);
        } else {
            alert("Error equipping rune: " + error.message);
        }
    };

    const openRuneModal = (buildId: number, slotIndex: number) => {
        setViewingBuildId(buildId);
        setSelectedRuneSlot(slotIndex);
        setShowRuneModal(true);
    };

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
        setTimeout(() => {
            let itemName = "";
            const rand = Math.random();
            let cumulative = 0;

            for (const [name, prob] of Object.entries(probabilities)) {
                cumulative += prob as number;
                if (rand <= cumulative) {
                    itemName = name;
                    break;
                }
            }

            if (!itemName) itemName = Object.keys(probabilities)[0];

            const rolledType = BASE_ITEM_STATS[activeTab][itemName]?.type || itemName;
            const baseStats = BASE_ITEM_STATS[activeTab][itemName] || (() => {
                // Fallback with proper default stats
                if (activeTab === 'armor') {
                    return { health: 5, price: 100, def: 10, type: rolledType };
                } else {
                    return { damage: 10, atkSpeed: 0.5, range: 8, price: 100, type: rolledType };
                }
            })();
            const finalStats = { ...baseStats };

            // Calculate trait bonuses
            let damageBonus = 0;
            let healthBonus = 0;
            let defBonus = 0;
            let atkSpeedBonus = 0;

            activeTraits.forEach((trait: any) => {
                const sv = trait.scalingValues || {};
                const chance = sv.chance !== undefined ? sv.chance : 1.0;

                if (sv.damage !== undefined) {
                    damageBonus += sv.damage * chance;
                }
                if (sv.health !== undefined) {
                    healthBonus += sv.health * chance;
                }
                if (sv.def !== undefined) {
                    defBonus += sv.def * chance;
                }
                if (sv.atkSpeed !== undefined) {
                    atkSpeedBonus += sv.atkSpeed * chance;
                }
            });

            if (activeTab === 'weapon') {
                finalStats.damage = (baseStats.damage || 0) * totalMultiplier * (1 + damageBonus);
                finalStats.atkSpeed = (baseStats.atkSpeed || 1.0) / (1 + atkSpeedBonus);
                finalStats.price = baseStats.price * totalMultiplier;
            } else {
                finalStats.def = (baseStats.def || 0) * totalMultiplier * (1 + defBonus);
                finalStats.health = (baseStats.health || 0) * totalMultiplier * (1 + healthBonus);
                finalStats.price = baseStats.price * totalMultiplier;
            }
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
                        <Link to="/" className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-110 transition-transform">
                            <Home className="text-white" size={16} />
                        </Link>
                        <h1 className="font-fredoka font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            The Forge <span className="text-xs text-gray-500 font-sans tracking-normal ml-2 hidden sm:inline">{t('app.calculator')}</span>
                        </h1>
                        <Link to="/damage-tester" className="ml-2 sm:ml-4 px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-bold transition-colors flex items-center gap-1">
                            <Zap size={12} /> <span className="hidden sm:inline">Damage Test</span><span className="sm:hidden">Test</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-md bg-red-500 text-[8px] text-white uppercase tracking-tighter">BETA</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link
                            to="/private-server"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors text-xs font-medium text-indigo-300"
                        >
                            <ExternalLink size={14} />
                            <span>Join Private Server</span>
                        </Link>
                        <button
                            onClick={() => setShowSavedBuilds(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors text-xs font-medium text-blue-300"
                        >
                            <Save size={14} />
                            <span>Saved Builds</span>
                            <span className="px-1 py-0.5 rounded bg-blue-500 text-[8px] text-white uppercase tracking-tighter">BETA</span>
                        </button>
                        <button
                            onClick={() => setShowInventory(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium"
                        >
                            <Coins size={14} className="text-yellow-500" />
                            <span>{t('app.inventory')} ({inventory.length})</span>
                        </button>
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 hidden lg:inline">{user.email}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-lg shadow-amber-900/20"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitcher />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-white">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/90 border-b border-white/10 backdrop-blur-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                        <Link
                            to="/private-server"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300"
                        >
                            <ExternalLink size={16} />
                            <span>Join Private Server</span>
                        </Link>
                        <button
                            onClick={() => { setShowSavedBuilds(true); setIsMenuOpen(false); }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-300"
                        >
                            <Save size={16} />
                            <span>Saved Builds</span>
                            <span className="ml-auto px-1.5 py-0.5 rounded bg-blue-500 text-[10px] text-white uppercase font-bold">BETA</span>
                        </button>
                        <button
                            onClick={() => { setShowInventory(true); setIsMenuOpen(false); }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium"
                        >
                            <Coins size={16} className="text-yellow-500" />
                            <span>{t('app.inventory')} ({inventory.length})</span>
                        </button>

                        <div className="h-px bg-white/10 my-1" />

                        {user ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-xs text-gray-400">{user.email}</span>
                                </div>
                                <button
                                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                                    className="w-full px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium text-center"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full px-4 py-3 rounded-xl bg-amber-600 text-white text-sm font-bold text-center shadow-lg shadow-amber-900/20"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}

                {/* Marquee Animation */}
                <div className="bg-black/40 border-b border-white/5 overflow-hidden py-1 flex">
                    <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex-shrink-0 flex">
                        {Array(10).fill(0).map((_, i) => (
                            <span key={i} className="text-[10px] text-gray-500 font-mono mx-4">{t('app.thanksTo')}</span>
                        ))}
                    </div>
                    <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex-shrink-0 flex" aria-hidden="true">
                        {Array(10).fill(0).map((_, i) => (
                            <span key={i} className="text-[10px] text-gray-500 font-mono mx-4">{t('app.thanksTo')}</span>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- LEFT COLUMN: Chances --- */}
                <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">


                    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <h2 className={`font-fredoka font-bold ${themeColor} flex items-center gap-2`}>
                                <Zap size={16} /> {t('app.forgeChances')}
                            </h2>
                            <span className="text-xs text-gray-500">{t('app.basedOn')} {totalOres} {t('app.ores')}</span>
                        </div>
                        <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                            {Object.entries(groupedProbabilities).length > 0 ? (
                                Object.entries(groupedProbabilities)
                                    .sort(([, a], [, b]) => b.total - a.total)
                                    .map(([type, group]) => {
                                        const isSingle = group.variants.length === 1;

                                        return (
                                            <div key={type} className="bg-black/20 rounded-lg p-3 border border-white/5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-bold text-gray-300">{type}</span>
                                                    <span className={`text-xs font-mono font-bold ${themeColor}`}>{(group.total * 100).toFixed(0)}%</span>
                                                </div>

                                                <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2">
                                                    {group.variants.map((variant, idx) => (
                                                        <div key={idx} className="flex flex-row lg:flex-col items-center gap-3 lg:gap-1 group w-full lg:w-16 p-2 lg:p-0 bg-white/5 lg:bg-transparent rounded-lg lg:rounded-none transition-colors hover:bg-white/10 lg:hover:bg-transparent" title={variant.name}>
                                                            <div className="w-12 h-12 shrink-0 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-colors">
                                                                {ITEM_IMAGES[variant.name] ? (
                                                                    <img src={ITEM_IMAGES[variant.name]} alt={variant.name} className="w-10 h-10 object-contain drop-shadow-md" />
                                                                ) : (
                                                                    <div className="text-xs text-gray-600">?</div>
                                                                )}
                                                            </div>
                                                            <span className="text-sm lg:text-[9px] text-gray-300 lg:text-gray-400 text-left lg:text-center leading-tight line-clamp-2 lg:w-full order-2 lg:order-3">
                                                                {isSingle ? type : variant.name}
                                                            </span>
                                                            <span className="text-xs lg:text-[10px] text-gray-500 font-mono leading-none order-3 lg:order-2 ml-auto lg:ml-0">
                                                                {variant.displayChance}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                            ) : (
                                <div className="p-8 text-center text-gray-600 text-sm italic">{t('app.addOres')}</div>
                            )}
                        </div>
                    </div>

                    {/* Stats Preview */}
                    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-xl">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="font-fredoka font-bold text-gray-400 text-sm">{t('app.activeTraits')}</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {activeTraits.length > 0 ? (
                                activeTraits.map((t_item, idx) => (
                                    <div key={idx} className="bg-black/30 border border-white/10 rounded-lg p-3 text-xs">
                                        <div className="flex justify-between mb-1">
                                            <span style={{ color: t_item.color }} className="font-bold">{t_item.oreName}</span>
                                            <span className="text-gray-500">{t_item.percentage.toFixed(0)}%</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">{t_item.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600 text-xs py-4">{t('app.noTraits')}</div>
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
                                <Sword size={16} /> {t('app.weapon')}
                            </button>
                            <button
                                onClick={() => setActiveTab('armor')}
                                className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'armor' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Shield size={16} /> {t('app.armor')}
                            </button>
                        </div>
                    </div>

                    {/* World Switcher */}
                    <div className="flex justify-center">
                        <div className="p-1 bg-black/40 border border-white/10 rounded-full flex gap-1 backdrop-blur-md">
                            {(['W1', 'W2', 'W3'] as World[]).map((w) => (
                                <button
                                    key={w}
                                    onClick={() => setActiveWorld(w)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeWorld === w ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The Cauldron */}
                    <div className={`relative bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 ${activeTab === 'weapon' ? 'shadow-orange-900/10' : 'shadow-teal-900/10'}`}>
                        {/* Multiplier */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{t('app.multiplier')}</span>
                            <div className={`text-4xl md:text-5xl font-fredoka font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-sm transition-all duration-300 ${totalMultiplier > 0 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
                                {totalMultiplier > 0 ? `${totalMultiplier.toFixed(2)} x` : '0.00x'}
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
                                        className={`relative aspect-[3/4.5] rounded-xl border-2 transition-all duration-300 group flex flex-col items-center justify-center p-2 bg-black/40 ${slotOre ? `shadow-[0_0_15px_-5px_var(--tw-shadow-color)]` : 'border-dashed border-white/10 hover:border-white/20 hover:bg-white/5'}`}
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
                                                    <div className="text-[10px] font-bold text-white truncate px-1" style={{ color: slotOre.color }}>{slotOre.name}</div>
                                                    <div className="text-[9px] text-gray-500 mt-0.5">{slotOre.multiplier}x</div>
                                                    <div className="text-[9px] font-mono text-gray-400 mt-1 bg-white/5 rounded px-1 inline-block">{percentage}%</div>
                                                </div>
                                                <button onClick={() => updateSlotCount(slot.id, -1)} className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 rounded-lg">
                                                    <div className="bg-red-500/10 p-2 rounded-full border border-red-500/20"><Trash2 size={16} /></div>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center text-gray-600"><div className="text-xs uppercase font-bold tracking-wider">{t('app.empty')}</div></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                            <button onClick={() => setSlots(slots.map(s => ({ ...s, oreId: null, count: 0 })))} className="px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                <Trash2 size={20} />
                            </button>
                            <button
                                onClick={handleForge}
                                disabled={totalOres < 3 || isForging}
                                className={`flex-1 rounded-xl font-fredoka font-bold text-lg tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${totalOres >= 3 ? `${themeBg} text-white hover:brightness-110 hover:-translate-y-1 ${themeGlow}` : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                            >
                                {isForging ? (<><Sparkles className="animate-spin" /> {t('app.forging')}</>) : (<><Hammer className="animate-pulse" /> {t('app.forgeItem')}</>)}
                            </button>
                        </div>
                    </div>

                    {/* Best Recipes Section */}
                    <div className="mt-6">
                        <button onClick={() => setShowBestRecipes(!showBestRecipes)} className="relative w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50">
                            <Sparkles size={20} />
                            {showBestRecipes ? t('app.hideRecipes') : t('app.showRecipes')} {t('app.bestRecipes')}
                            <ArrowRight size={16} className={`transition-transform ${showBestRecipes ? 'rotate-90' : ''}`} />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg animate-pulse border border-black font-bold">NEW</span>
                        </button>
                        {showBestRecipes && (
                            <div className="mt-4 bg-card border border-card-border rounded-xl p-6 shadow-2xl">
                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setActiveTab('weapon')} className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'weapon' ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><Sword size={16} className="inline mr-2" />{t('app.weapons')}</button>
                                    <button onClick={() => setActiveTab('armor')} className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'armor' ? 'bg-teal-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}><Shield size={16} className="inline mr-2" />{t('app.armor')}</button>
                                </div>
                                {activeTab === 'weapon' ? (
                                    <div className="space-y-6 max-h-[600px] overflow-y-auto">
                                        {Object.entries(BEST_WEAPONS_RECIPES).map(([weaponType, recipes]) => (
                                            <div key={weaponType} className="bg-black/20 rounded-lg p-4 border border-white/5">
                                                <h3 className="text-lg font-fredoka font-bold text-orange-400 mb-3 flex items-center gap-2">
                                                    {weaponType}
                                                    {["Icy Boulder (Mid Tier)", "Small Ice Crystals (Low-Mid Tier)", "Medium Ice Crystals (High Tier)", "Large Ice Crystals (Higher Tier)", "Large Ice Crystals (Crazy Tier)"].includes(weaponType) && (
                                                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                                                    )}
                                                </h3>
                                                <div className="space-y-2">
                                                    {recipes.map((recipe: any, idx: number) => (
                                                        <div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="text-sm font-bold text-gray-300">{recipe.tier}</span>
                                                                <div className="flex gap-2">
                                                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">{recipe.multiplier}x</span>
                                                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded font-mono">{recipe.chance}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {recipe.recipe.map((ingredient: any, i: number) => {
                                                                    const ore = ORE_DATA.find(o => o.name === ingredient.ore);
                                                                    return (
                                                                        <div key={i} className="flex items-center gap-1 bg-black/40 rounded px-2 py-1 border border-white/10" style={{ borderColor: ore?.color + '40' }}>
                                                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: ore?.color || '#666' }} />
                                                                            <span className="text-xs font-bold" style={{ color: ore?.color }}>{ingredient.count}</span>
                                                                            <span className="text-xs text-gray-400">{ingredient.ore}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-6 max-h-[600px] overflow-y-auto">
                                        {Object.entries(BEST_ARMOR_RECIPES).map(([setName, pieces]) => (
                                            <div key={setName} className="bg-black/20 rounded-lg p-4 border border-white/5">
                                                <h3 className="text-lg font-fredoka font-bold text-teal-400 mb-3 flex items-center gap-2">
                                                    {setName}
                                                    {["BEST RECIPE", "Speed Set", "Damage Set", "Late Island 3 Set", "Mid Island 3 Set", "Early Island 3 Set"].includes(setName) && (
                                                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                                                    )}
                                                </h3>
                                                <div className="space-y-2">
                                                    {pieces.map((recipe: any, idx: number) => (
                                                        <div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="text-sm font-bold text-gray-300">{recipe.piece}</span>
                                                                <div className="flex gap-2">
                                                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">{recipe.multiplier}x</span>
                                                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded font-mono">{recipe.chance}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {recipe.recipe.map((ingredient: any, i: number) => {
                                                                    const ore = ORE_DATA.find(o => o.name === ingredient.ore);
                                                                    return (
                                                                        <div key={i} className="flex items-center gap-1 bg-black/40 rounded px-2 py-1 border border-white/10" style={{ borderColor: ore?.color + '40' }}>
                                                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: ore?.color || '#666' }} />
                                                                            <span className="text-xs font-bold" style={{ color: ore?.color }}>{ingredient.count}</span>
                                                                            <span className="text-xs text-gray-400">{ingredient.ore}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Forge Chances */}
                    <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-xl">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h2 className="font-fredoka font-bold text-gray-400 text-sm">{t('app.forgeChances')}</h2>
                            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 uppercase tracking-tighter font-bold">{activeWorld}</span>
                        </div>
                        <div className="p-4 space-y-2">
                            {Object.entries(probabilities).length > 0 ? (
                                Object.entries(probabilities)
                                    .sort(([, a], [, b]) => (b as number) - (a as number))
                                    .map(([name, prob]) => (
                                        <div key={name} className="flex justify-between items-center text-xs">
                                            <span className="text-gray-300">{name}</span>
                                            <span className="font-mono text-indigo-400 font-bold">{(prob as number * 100).toFixed(2)}%</span>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center text-gray-600 text-xs py-2">Add more ores to see chances</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Ore Selection --- */}
                <div className="lg:col-span-3 h-[600px] lg:h-auto flex flex-col gap-4 order-3">
                    {/* Search & Filter */}
                    <div className="bg-card border border-card-border rounded-xl p-4 space-y-4 shadow-lg">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                            <input type="text" placeholder={t('app.searchOres')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-600" />
                        </div>

                        <div className="relative flex items-center">
                            <button
                                onClick={() => scrollTabs('left')}
                                className="absolute left-0 z-10 bg-black/80 p-1.5 rounded-l-md border-y border-l border-white/10 text-gray-400 hover:text-white transition-colors h-full flex items-center justify-center"
                                aria-label="Scroll Left"
                            >
                                <ChevronLeft size={14} />
                            </button>

                            <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-2 pt-2 scrollbar-hide px-8 w-full scroll-smooth">
                                {(['peak', 'frostpire', 'stonewake', 'kingdom', 'goblin', 'enemy'] as Area[]).map(area => (
                                    <button key={area} onClick={() => setActiveArea(area)} className={`relative px-4 py-1.5 text-xs font-bold uppercase rounded-md whitespace-nowrap border transition-all flex-shrink-0 ${activeArea === area ? 'bg-white/10 text-white border-white/20' : 'text-gray-600 border-transparent hover:text-gray-400'}`}>
                                        {area}
                                        {(area === 'frostpire' || area === 'peak') && (
                                            <span className="absolute -top-1.5 -right-1.5 z-10 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm animate-pulse border border-black">NEW</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollTabs('right')}
                                className="absolute right-0 z-10 bg-black/80 p-1.5 rounded-r-md border-y border-r border-white/10 text-gray-400 hover:text-white transition-colors h-full flex items-center justify-center"
                                aria-label="Scroll Right"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Ore Grid */}
                    <div className="flex-1 bg-card border border-card-border rounded-xl overflow-hidden shadow-lg flex flex-col">
                        <div className="flex-1 overflow-y-auto p-2 grid grid-cols-4 gap-2 content-start">
                            {areaOres.map(ore => (
                                <button key={ore.id} onClick={() => handleAddOre(ore)} className="group relative flex flex-col items-center p-2 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: ore.color }} />

                                    <div className="relative z-10 flex flex-col items-center w-full">
                                        <OreIcon ore={ore} />
                                        <div className="mt-2 text-center w-full">
                                            <div className="text-[10px] font-bold text-gray-100 leading-tight line-clamp-2 drop-shadow-md" title={ore.name}>{ore.name}</div>
                                            <div className="text-[9px] text-gray-400 mt-0.5 font-mono">{ore.multiplier}x</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {areaOres.length === 0 && (<div className="col-span-4 p-8 text-center text-gray-600 text-sm">{t('app.noOres')}</div>)}
                        </div>
                    </div>
                </div>
            </main>

            {/* --- MODAL: Forge Result --- */}
            {
                forgeResult && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-card border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: forgeResult.mainOre.color }} />
                            <button onClick={() => setForgeResult(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"><X size={20} /></button>
                            <div className="p-8 text-center overflow-y-auto custom-scrollbar">
                                <div className="mb-6 flex justify-center">
                                    <div className="w-24 h-24 rounded-xl shadow-[0_0_30px_-5px_var(--glow)] flex items-center justify-center bg-black border border-white/10 relative" style={{ '--glow': forgeResult.mainOre.color } as React.CSSProperties}>
                                        <div className="absolute inset-0 bg-white/5 rounded-xl" />
                                        {ITEM_VARIANTS[activeTab]?.[forgeResult.itemType]?.[activeArea]?.find(v => v.name === forgeResult.itemName) ? (
                                            <div className="text-4xl">⚔️</div>
                                        ) : (
                                            <div className="text-4xl" style={{ color: forgeResult.mainOre.color }}>
                                                {activeTab === 'weapon' ? <Sword size={40} /> : <Shield size={40} />}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-fredoka font-bold text-white mb-1">{forgeResult.itemName}</h2>
                                <div className="text-sm text-gray-500 uppercase tracking-widest mb-6 font-bold">{forgeResult.itemType}</div>
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
                                {forgeResult.traits.length > 0 && (
                                    <div className="mb-6 text-left bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h3 className="text-xs uppercase text-gray-500 font-bold mb-3 flex items-center gap-2"><Sparkles size={12} className="text-yellow-500" /> {t('app.activeTraits')}</h3>
                                        <div className="space-y-3">
                                            {forgeResult.traits.map((t_item, i) => (
                                                <div key={i} className="text-sm border-l-2 pl-3 py-0.5" style={{ borderColor: t_item.color }}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <span style={{ color: t_item.color }} className="font-bold">{t_item.oreName}</span>
                                                        <span className="text-[10px] bg-white/10 px-1.5 rounded text-gray-400">{t_item.percentage.toFixed(0)}%</span>
                                                    </div>
                                                    <p className="text-gray-300 text-xs leading-relaxed opacity-90">{t_item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-2 justify-center mt-4">
                                    <button onClick={() => { setForgeResult(null); handleForge(); }} className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors flex-1">{t('app.forgeAgain')}</button>
                                    <button onClick={handleSaveBuild} className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center gap-2">
                                        <Save size={18} />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* --- MODAL: Inventory --- */}
            {
                showInventory && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
                        <div className="bg-card border border-card-border rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl relative">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-fredoka font-bold flex items-center gap-2"><Coins className="text-yellow-500" /> {t('app.forgeHistory')}</h2>
                                <button onClick={() => setShowInventory(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
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
                                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{item.multiplier.toFixed(2)}x</span>
                                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 truncate max-w-[100px]">{item.mainOre.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-600"><Sword size={48} className="mb-4 opacity-20" /><p>{t('app.noItems')}</p></div>
                                )}
                            </div>
                            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20 rounded-b-2xl">
                                <div className="text-sm text-gray-500">{t('app.totalValue')}: <span className="text-yellow-500 font-bold">${inventory.reduce((a, b) => a + (b.stats.price || 0), 0).toLocaleString()}</span></div>
                                <button onClick={() => setInventory([])} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 size={12} /> {t('app.clearHistory')}</button>
                            </div>
                        </div>
                    </div>
                )
            }



            {/* --- MODAL: Saved Builds --- */}
            {
                showSavedBuilds && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
                        <div className="bg-card border border-card-border rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl relative">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-fredoka font-bold flex items-center gap-2"><Save className="text-blue-500" /> Saved Builds</h2>
                                <button onClick={() => setShowSavedBuilds(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                {!user ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                        <p>Please login to view saved builds.</p>
                                        <Link to="/login" className="mt-4 text-amber-500 hover:underline">Login</Link>
                                    </div>
                                ) : savedBuilds.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {savedBuilds.map(build => {
                                            const item = build.build_data as ForgedItem;
                                            const level = item.enhancementLevel || 0;
                                            const damageMultiplier = 1 + (level * 0.10);
                                            const displayDamage = item.stats.damage ? (item.stats.damage * damageMultiplier).toFixed(1) : null;
                                            const runeSlots = level >= 6 ? 2 : level >= 3 ? 1 : 0;
                                            const equippedRunes = item.equippedRunes || [];

                                            return (
                                                <div key={build.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 transition-colors">
                                                    <div className="flex justify-between items-start">
                                                        <div className="font-bold text-white truncate text-lg flex items-center gap-2">
                                                            {build.name}
                                                            {level > 0 && <span className="text-xs bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">+{level}</span>}
                                                        </div>
                                                        <button onClick={() => deleteBuild(build.id)} className="text-gray-600 hover:text-red-400"><Trash2 size={16} /></button>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="w-12 h-12 rounded-lg bg-white/5 shrink-0 flex items-center justify-center border border-white/5 relative">
                                                            {item.mode === 'weapon' ? <Sword size={20} className="text-gray-500" /> : <Shield size={20} className="text-gray-500" />}
                                                            {level > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 rounded-full text-[8px] flex items-center justify-center font-bold text-white border border-black">+{level}</div>}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm text-gray-300 truncate">{item.itemName}</div>
                                                            {displayDamage && <div className="text-xs text-red-400 font-bold">{displayDamage} DMG</div>}
                                                            <div className="text-xs text-gray-500">{new Date(build.created_at).toLocaleDateString()}</div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                                        {Object.entries(build.build_data.stats).filter(([k]) => k !== 'type' && k !== 'price').map(([key, value]) => {
                                                            let displayValue = value;
                                                            if (key === 'damage' && typeof value === 'number') {
                                                                displayValue = value * (1 + level * 0.10);
                                                            }
                                                            return (
                                                                <div key={key} className="bg-black/40 rounded p-1.5 flex justify-between items-center">
                                                                    <span className="text-[10px] uppercase text-gray-500 font-bold">{key}</span>
                                                                    <span className={`text-xs font-bold ${key === 'damage' && level > 0 ? 'text-amber-400' : 'text-white'}`}>
                                                                        {typeof displayValue === 'number' ? (displayValue as number).toFixed(key === 'atkSpeed' ? 2 : 0) : (displayValue as React.ReactNode)}
                                                                        {key === 'atkSpeed' && 's'}
                                                                        {key === 'health' && '%'}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Rune Slots */}
                                                    {(build.build_data.enhancementLevel || 0) >= 3 && (
                                                        <div className="flex gap-2 mb-3">
                                                            {[0, 1].map(slotIdx => {
                                                                if (slotIdx === 1 && (build.build_data.enhancementLevel || 0) < 6) return null;
                                                                const rune = build.build_data.equippedRunes?.[slotIdx];
                                                                return (
                                                                    <button
                                                                        key={slotIdx}
                                                                        onClick={() => openRuneModal(build.id, slotIdx)}
                                                                        className="w-8 h-8 rounded bg-black/40 border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-colors relative group"
                                                                        title={rune ? rune.name : "Empty Rune Slot"}
                                                                    >
                                                                        {rune ? (
                                                                            <img src={rune.image} className="w-full h-full object-cover rounded" />
                                                                        ) : (
                                                                            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-purple-500/50" />
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    <div className="flex gap-2 mt-auto">
                                                        <div className="flex items-center bg-amber-600/20 rounded-lg">
                                                            <button
                                                                onClick={() => handleEnhance(build.id, -1)}
                                                                className="px-3 py-2 text-amber-300 hover:bg-amber-600/20 rounded-l-lg transition-colors"
                                                                disabled={(build.build_data.enhancementLevel || 0) <= 0}
                                                            >
                                                                -
                                                            </button>
                                                            <div className="text-xs font-bold text-amber-300 px-1 flex items-center gap-1">
                                                                <Zap size={12} />
                                                                <span>Enhance</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleEnhance(build.id, 1)}
                                                                className="px-3 py-2 text-amber-300 hover:bg-amber-600/20 rounded-r-lg transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button onClick={() => loadBuild(build)} className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1">
                                                            <Download size={12} /> Load
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-600"><Save size={48} className="mb-4 opacity-20" /><p>No saved builds yet.</p></div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* --- MODAL: Rune Selection --- */}
            {
                showRuneModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
                        <div className="bg-card border border-card-border rounded-2xl w-full max-w-2xl h-[70vh] flex flex-col shadow-2xl relative">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-fredoka font-bold flex items-center gap-2"><Sparkles className="text-purple-500" /> Select Rune</h2>
                                <button onClick={() => setShowRuneModal(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {runesData
                                    .filter(rune => ["Flame Spark", "Blast Chip", "Drain Edge", "Venom Crumb"].includes(rune.name))
                                    .map((rune, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleEquipRune(rune as Rune)}
                                            className="bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-3 hover:bg-white/5 hover:border-white/20 transition-all group text-left"
                                        >
                                            <div className="w-16 h-16 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">
                                                {rune.image ? (
                                                    <img src={rune.image} alt={rune.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                ) : (
                                                    <div className="w-8 h-8 rotate-45 bg-purple-500/50" />
                                                )}
                                            </div>
                                            <div className="w-full">
                                                <div className="font-bold text-white text-sm mb-1">{rune.name}</div>
                                                <div className="text-[10px] text-gray-400 line-clamp-3">{rune.description}</div>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* --- ChatBot --- */}
            <ChatBot />
        </div>
    );
}

// --- Support Popup Component ---
const SupportPopup = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-colors duration-500" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />

                <div className="relative flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Heart size={40} className="text-white fill-white/20" />
                    </div>

                    <h2 className="text-2xl font-fredoka font-bold text-white mb-3">
                        Support Me for better Website
                    </h2>

                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Your support helps me keep the servers running and add new features to the Forge Calculator!
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <a
                            href="https://sociabuzz.com/galangsw_/tribe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 group"
                        >
                            Support Now
                            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <button
                            onClick={onClose}
                            className="w-full py-3 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

// --- Main App with Router ---
export default function App() {
    const [showSupport, setShowSupport] = useState(false);

    useEffect(() => {
        const lastShown = localStorage.getItem('support_popup_last_shown');
        const now = Date.now();
        const TWO_HOURS = 2 * 60 * 60 * 1000;

        if (!lastShown || (now - parseInt(lastShown)) > TWO_HOURS) {
            const timer = setTimeout(() => {
                setShowSupport(true);
                localStorage.setItem('support_popup_last_shown', now.toString());
            }, 2000); // Show after 2 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AuthProvider>
            <LanguageProvider>
                <Router>
                    {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/damage-tester" element={<DamageTester />} />
                        <Route path="/private-server" element={<PrivateServerTutorial />} />
                        <Route path="/wiki" element={<WikiLayout />}>
                            <Route index element={<WikiHome />} />
                            <Route path="ores" element={<WikiOres />} />
                            <Route path="weapons" element={<WikiWeapons />} />
                            <Route path="armor" element={<WikiArmor />} />
                            <Route path="guides" element={<WikiGuides />} />
                        </Route>
                    </Routes>
                </Router>
            </LanguageProvider>
        </AuthProvider>
    );
}
