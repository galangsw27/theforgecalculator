import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sword, Shield, Skull, Zap, ArrowLeft, Save, ChevronDown, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import enemiesData from '../data/enemies.json';
import { ForgedItem } from '../../types';

// Helper to parse range strings like "20-52 HP" or "6-11.2 DMG"
const parseRange = (str: string) => {
    const clean = str.replace(/[^\d.-]/g, '');
    if (clean.includes('-')) {
        const [min, max] = clean.split('-').map(Number);
        return { min, max, avg: (min + max) / 2 };
    }
    const val = Number(clean);
    return { min: val, max: val, avg: val };
};

const DamageTester: React.FC = () => {
    const { user, profile } = useAuth();
    const [selectedEnemyIndex, setSelectedEnemyIndex] = useState<number>(0);
    const [selectedBuildId, setSelectedBuildId] = useState<number | 'custom'>('custom');
    const [savedBuilds, setSavedBuilds] = useState<any[]>([]);
    const [hitAnimation, setHitAnimation] = useState<{ damage: number; id: number } | null>(null);
    const [enemyHitAnimation, setEnemyHitAnimation] = useState<{ damage: number; id: number } | null>(null);
    const [currentEnemyHP, setCurrentEnemyHP] = useState<number>(0);
    const [userCurrentHP, setUserCurrentHP] = useState<number>(0);
    const [isAutoAttacking, setIsAutoAttacking] = useState<boolean>(false);
    const [isEnemyAttacking, setIsEnemyAttacking] = useState<boolean>(false);
    const [testerMode, setTesterMode] = useState<'weapon' | 'armor'>('weapon');

    // Multi-slot Armor Selection
    const [selectedHelmetId, setSelectedHelmetId] = useState<number | 'none'>('none');
    const [selectedChestplateId, setSelectedChestplateId] = useState<number | 'none'>('none');
    const [selectedLeggingsId, setSelectedLeggingsId] = useState<number | 'none'>('none');

    // Custom Weapon Stats
    const [customDamage, setCustomDamage] = useState<number>(10);
    const [customAtkSpeed, setCustomAtkSpeed] = useState<number>(1.0);

    // Custom Armor Stats
    const [customHealth, setCustomHealth] = useState<number>(100);
    const [customDefense, setCustomDefense] = useState<number>(10);

    const fetchSavedBuilds = async () => {
        if (!supabase || !user) return;
        const { data } = await supabase
            .from('builds')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setSavedBuilds(data);
    };

    useEffect(() => {
        if (user) {
            fetchSavedBuilds();
        }
    }, [user]);

    // Auto-refresh builds when page becomes visible or every few seconds
    useEffect(() => {
        if (!user) return;

        // Refresh when page becomes visible
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchSavedBuilds();
            }
        };

        // Refresh every 3 seconds to catch updates from other tabs/windows
        const intervalId = setInterval(() => {
            fetchSavedBuilds();
        }, 3000);

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user]);

    const enemy = enemiesData[selectedEnemyIndex];
    const enemyHealth = useMemo(() => parseRange(enemy.Health), [enemy]);
    const enemyDamage = useMemo(() => parseRange(enemy.Damage), [enemy]);

    // Initialize current HP when enemy changes
    useEffect(() => {
        setCurrentEnemyHP(enemyHealth.avg);
    }, [enemyHealth.avg]);

    // Filter builds based on mode
    const filteredBuilds = useMemo(() => {
        return savedBuilds.filter(b => (b.build_data as ForgedItem).mode === testerMode);
    }, [savedBuilds, testerMode]);

    const helmetBuilds = useMemo(() =>
        savedBuilds.filter(b => (b.build_data as ForgedItem).mode === 'armor' && (b.build_data as ForgedItem).itemType.toLowerCase().includes('helmet')),
        [savedBuilds]);

    const chestplateBuilds = useMemo(() =>
        savedBuilds.filter(b => (b.build_data as ForgedItem).mode === 'armor' && (b.build_data as ForgedItem).itemType.toLowerCase().includes('chestplate')),
        [savedBuilds]);

    const leggingsBuilds = useMemo(() =>
        savedBuilds.filter(b => (b.build_data as ForgedItem).mode === 'armor' && (b.build_data as ForgedItem).itemType.toLowerCase().includes('leggings')),
        [savedBuilds]);

    // Reset selection when mode changes
    useEffect(() => {
        setSelectedBuildId('custom');
        setSelectedHelmetId('none');
        setSelectedChestplateId('none');
        setSelectedLeggingsId('none');
        setIsAutoAttacking(false);
        setIsEnemyAttacking(false);
    }, [testerMode]);

    const weaponStats = useMemo(() => {
        if (selectedBuildId === 'custom') {
            return { damage: customDamage, atkSpeed: customAtkSpeed, name: 'Custom Weapon', runes: [], runeDps: 0 };
        }
        const build = savedBuilds.find(b => b.id === selectedBuildId);
        if (build) {
            const item = build.build_data as ForgedItem;
            const level = item.enhancementLevel || 0;
            const damageMultiplier = 1 + (level * 0.10);
            const baseDamage = item.stats.damage || 0;
            const enhancedDamage = baseDamage * damageMultiplier;
            const runes = item.equippedRunes || [];

            // Debug logging
            console.log('=== Damage Tester Debug ===');
            console.log('Build:', build.name);
            console.log('Enhancement Level:', level);
            console.log('Base Damage:', baseDamage);
            console.log('Damage Multiplier:', damageMultiplier);
            console.log('Enhanced Damage:', enhancedDamage);
            console.log('Build Data:', build.build_data);

            // Calculate Rune DPS
            let runeDps = 0;
            runes.forEach((rune: any) => {
                if (rune && rune.simulation) {
                    const sim = rune.simulation;
                    const avgChance = (sim.chanceMin + sim.chanceMax) / 2;
                    const avgDmgPct = (sim.damagePercentMin + sim.damagePercentMax) / 2;

                    if (sim.type === 'dot') {
                        // DoT: (DamagePerSec * Duration) * Chance / 1s (simplified spread)
                        // Actually, for DPS, we can just say it adds (AvgDmgPct * BaseDmg * Duration) * Chance per hit
                        // Then multiply by AtkSpeed later.
                        // Wait, DoT DPS is independent of AtkSpeed if it doesn't stack. 
                        // But usually in these games, multiple procs refresh or stack. 
                        // Let's assume linear stacking for "Average DPS" simulation.
                        const avgDuration = (sim.durationMin + sim.durationMax) / 2;
                        const damagePerProc = enhancedDamage * avgDmgPct * avgDuration;
                        const expectedDamagePerHit = damagePerProc * avgChance;
                        runeDps += expectedDamagePerHit * (item.stats.atkSpeed || 1.0);
                    } else if (sim.type === 'instant') {
                        const damagePerProc = enhancedDamage * avgDmgPct;
                        const expectedDamagePerHit = damagePerProc * avgChance;
                        runeDps += expectedDamagePerHit * (item.stats.atkSpeed || 1.0);
                    }
                }
            });

            console.log('Rune DPS:', runeDps);
            console.log('Total DPS:', (enhancedDamage * (item.stats.atkSpeed || 1.0)) + runeDps);

            return {
                damage: enhancedDamage,
                atkSpeed: item.stats.atkSpeed || 1.0,
                name: `${build.name} (+${level})`,
                runes: runes,
                runeDps: runeDps
            };
        }
        return { damage: 0, atkSpeed: 1, name: 'Unknown', runes: [], runeDps: 0 };
    }, [selectedBuildId, savedBuilds, customDamage, customAtkSpeed, testerMode]);

    const armorStats = useMemo(() => {
        if (testerMode !== 'armor') return { health: 0, def: 0, name: '' };
        if (selectedBuildId === 'custom') {
            return { health: customHealth, def: customDefense, name: 'Custom Armor' };
        }

        let totalHealth = 0;
        let totalDef = 0;
        const equippedNames: string[] = [];

        const calculateItemStats = (id: number | 'none') => {
            if (id === 'none') return;
            const build = savedBuilds.find(b => b.id === id);
            if (build) {
                const item = build.build_data as ForgedItem;
                const level = item.enhancementLevel || 0;
                const multiplier = 1 + (level * 0.10);
                totalHealth += (item.stats.health || 0) * multiplier;
                totalDef += (item.stats.def || 0) * multiplier;
                equippedNames.push(`${build.name} (+${level})`);
            }
        };

        calculateItemStats(selectedHelmetId);
        calculateItemStats(selectedChestplateId);
        calculateItemStats(selectedLeggingsId);

        return {
            health: totalHealth,
            def: totalDef,
            name: equippedNames.length > 0 ? equippedNames.join(', ') : 'No Armor'
        };
    }, [selectedBuildId, selectedHelmetId, selectedChestplateId, selectedLeggingsId, savedBuilds, customHealth, customDefense, testerMode]);

    // Initialize user HP when armor stats change
    useEffect(() => {
        if (testerMode === 'armor') {
            setUserCurrentHP(armorStats.health);
        }
    }, [armorStats.health, testerMode]);

    // Simulation - Force recalculation when weaponStats changes
    const totalDps = useMemo(() => {
        console.log('=== DPS Calculation ===');
        console.log('Weapon Damage:', weaponStats.damage);
        console.log('Attack Speed:', weaponStats.atkSpeed);
        console.log('Rune DPS:', weaponStats.runeDps);
        // Fix: Divide by atkSpeed (duration) to get DPS
        const calculated = (weaponStats.damage / weaponStats.atkSpeed) + (weaponStats.runeDps || 0);
        console.log('Total DPS:', calculated);
        return calculated;
    }, [weaponStats.damage, weaponStats.atkSpeed, weaponStats.runeDps]);

    const dps = totalDps;
    const timeToKill = enemyHealth.avg / dps;
    const hitsToKill = Math.ceil(enemyHealth.avg / (weaponStats.damage + ((weaponStats.runeDps || 0) * weaponStats.atkSpeed)));

    // Handle Hit Button
    const handleHit = () => {
        // Damage per hit = Base Damage + (Rune DPS * AtkSpeed)
        // This represents the average damage dealt in one swing including rune procs
        const avgRuneDamagePerHit = (weaponStats.runeDps || 0) * weaponStats.atkSpeed;
        const totalBaseDamage = weaponStats.damage + avgRuneDamagePerHit;

        const variance = 0.1; // ±10% variance
        const randomFactor = 1 + (Math.random() * variance * 2 - variance);
        const actualDamage = Math.round(totalBaseDamage * randomFactor);

        // Reduce enemy HP
        setCurrentEnemyHP(prev => Math.max(0, prev - actualDamage));

        setHitAnimation({ damage: actualDamage, id: Date.now() });
        setTimeout(() => setHitAnimation(null), 1000);
    };

    // Handle Enemy Hit
    const handleEnemyHit = () => {
        const baseDamage = enemyDamage.avg;
        const userDef = armorStats.def;

        // Simple defense formula: Damage = Base Damage * (100 / (100 + Defense))
        // Or more simply: Damage = Max(1, Base Damage - Defense)
        // Let's use a common formula: actualDamage = baseDamage * (1 - (def / (def + 100)))
        const damageReduction = userDef / (userDef + 100);
        const actualDamage = Math.max(1, Math.round(baseDamage * (1 - damageReduction)));

        setUserCurrentHP(prev => Math.max(0, prev - actualDamage));
        setEnemyHitAnimation({ damage: actualDamage, id: Date.now() });
        setTimeout(() => setEnemyHitAnimation(null), 1000);
    };

    // Auto-Attack Effect
    useEffect(() => {
        let userInterval: any;
        let enemyInterval: any;

        if (isAutoAttacking && currentEnemyHP > 0 && testerMode === 'weapon') {
            userInterval = setInterval(() => {
                handleHit();
            }, weaponStats.atkSpeed * 1000);
        }

        if (isEnemyAttacking && userCurrentHP > 0 && testerMode === 'armor') {
            // Assume enemy attack speed is 1.5s if not specified
            const enemyAtkSpeed = 1.5;
            enemyInterval = setInterval(() => {
                handleEnemyHit();
            }, enemyAtkSpeed * 1000);
        }

        return () => {
            clearInterval(userInterval);
            clearInterval(enemyInterval);
        };
    }, [isAutoAttacking, isEnemyAttacking, currentEnemyHP, userCurrentHP, weaponStats.atkSpeed, weaponStats.damage, weaponStats.runeDps, testerMode, enemyDamage.avg, armorStats.def]);

    // Reset HP
    const resetHP = () => {
        setCurrentEnemyHP(enemyHealth.avg);
        setUserCurrentHP(armorStats.health);
        setIsAutoAttacking(false);
        setIsEnemyAttacking(false);
    };

    // Rune Effects Text
    const activeRunes = (weaponStats.runes || []).filter(r => r !== null);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/calculator" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-fredoka font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 flex items-center gap-2">
                            Damage Tester
                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500 text-white uppercase tracking-widest font-sans">BETA</span>
                        </h1>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setTesterMode('weapon')}
                            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${testerMode === 'weapon'
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            <Sword size={18} /> Weapon
                        </button>
                        <button
                            onClick={() => setTesterMode('armor')}
                            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${testerMode === 'armor'
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            <Shield size={18} /> Armor
                        </button>
                    </div>
                </div>

                {/* Beta Warning Banner */}
                <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-amber-200/80">
                    <AlertTriangle size={20} className="shrink-0 text-amber-500" />
                    <p className="text-sm">
                        <span className="font-bold text-amber-500 mr-1">BETA NOTICE:</span>
                        This feature is currently in development. Damage calculations and armor simulations may not be 100% accurate and are subject to change.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Configuration */}
                    <div className="space-y-6">
                        {/* Enemy Selection */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                                <Skull size={20} /> Select Enemy
                            </h2>
                            <div className="relative">
                                <select
                                    value={selectedEnemyIndex}
                                    onChange={(e) => setSelectedEnemyIndex(Number(e.target.value))}
                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 appearance-none focus:outline-none focus:border-red-500 text-white"
                                >
                                    {Object.entries(
                                        enemiesData.reduce((acc, enemy, index) => {
                                            const region = enemy.Region || 'Unknown';
                                            if (!acc[region]) acc[region] = [];
                                            acc[region].push({ enemy, index });
                                            return acc;
                                        }, {} as Record<string, { enemy: typeof enemiesData[0], index: number }[]>)
                                    ).map(([region, enemies]) => (
                                        <optgroup key={region} label={region}>
                                            {enemies.map(({ enemy, index }) => (
                                                <option key={index} value={index}>
                                                    {enemy.name} (Lvl {enemy.Level})
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                            </div>

                            <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/5 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Health</span>
                                    <span className="font-bold text-green-400">{enemy.Health}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Damage</span>
                                    <span className="font-bold text-red-400">{enemy.Damage}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Region</span>
                                    <span className="text-gray-300">{enemy.Region}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 italic">"{enemy.description}"</p>
                            </div>
                        </div>

                        {/* Build Selection */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                                {testerMode === 'weapon' ? <Sword size={20} /> : <Shield size={20} />}
                                Select {testerMode === 'weapon' ? 'Weapon' : 'Armor'}
                            </h2>

                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setSelectedBuildId('custom')}
                                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${selectedBuildId === 'custom' ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400'}`}
                                >
                                    Custom
                                </button>
                                <button
                                    onClick={() => savedBuilds.length > 0 && setSelectedBuildId(savedBuilds[0].id)}
                                    disabled={savedBuilds.length === 0}
                                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${selectedBuildId !== 'custom' ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 disabled:opacity-50'}`}
                                >
                                    Saved Build
                                </button>
                            </div>

                            {selectedBuildId === 'custom' ? (
                                <div className="space-y-4">
                                    {testerMode === 'weapon' ? (
                                        <>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Damage</label>
                                                <input
                                                    type="number"
                                                    value={customDamage}
                                                    onChange={(e) => setCustomDamage(Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 text-white focus:border-orange-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Attack Speed</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={customAtkSpeed}
                                                    onChange={(e) => setCustomAtkSpeed(Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 text-white focus:border-orange-500 outline-none"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Health</label>
                                                <input
                                                    type="number"
                                                    value={customHealth}
                                                    onChange={(e) => setCustomHealth(Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 text-white focus:border-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Defense</label>
                                                <input
                                                    type="number"
                                                    value={customDefense}
                                                    onChange={(e) => setCustomDefense(Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 text-white focus:border-blue-500 outline-none"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {testerMode === 'weapon' ? (
                                        <>
                                            <div className="relative">
                                                <select
                                                    value={selectedBuildId}
                                                    onChange={(e) => setSelectedBuildId(Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 appearance-none focus:outline-none focus:border-orange-500 text-white"
                                                >
                                                    {filteredBuilds.map(b => (
                                                        <option key={b.id} value={b.id}>{b.name} ({b.build_data.itemName})</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                            </div>

                                            {/* Stats Display */}
                                            <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Base Damage:</span>
                                                    <span className="text-white font-mono">
                                                        {savedBuilds.find(b => b.id === selectedBuildId)?.build_data.stats.damage.toFixed(1) || '0'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Enhancement:</span>
                                                    <span className="text-amber-400 font-mono font-bold">
                                                        +{savedBuilds.find(b => b.id === selectedBuildId)?.build_data.enhancementLevel || 0}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs border-t border-white/10 pt-1">
                                                    <span className="text-gray-400">Enhanced Damage:</span>
                                                    <span className="text-orange-400 font-mono font-bold">
                                                        {weaponStats.damage.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                {/* Helmet Slot */}
                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Helmet</label>
                                                    <div className="relative">
                                                        <select
                                                            value={selectedHelmetId}
                                                            onChange={(e) => setSelectedHelmetId(e.target.value === 'none' ? 'none' : Number(e.target.value))}
                                                            className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 appearance-none focus:outline-none focus:border-blue-500 text-white text-sm"
                                                        >
                                                            <option value="none">None</option>
                                                            {helmetBuilds.map(b => (
                                                                <option key={b.id} value={b.id}>{b.name} (+{b.build_data.enhancementLevel || 0})</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                                    </div>
                                                </div>
                                                {/* Chestplate Slot */}
                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Chestplate</label>
                                                    <div className="relative">
                                                        <select
                                                            value={selectedChestplateId}
                                                            onChange={(e) => setSelectedChestplateId(e.target.value === 'none' ? 'none' : Number(e.target.value))}
                                                            className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 appearance-none focus:outline-none focus:border-blue-500 text-white text-sm"
                                                        >
                                                            <option value="none">None</option>
                                                            {chestplateBuilds.map(b => (
                                                                <option key={b.id} value={b.id}>{b.name} (+{b.build_data.enhancementLevel || 0})</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                                    </div>
                                                </div>
                                                {/* Leggings Slot */}
                                                <div>
                                                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Leggings</label>
                                                    <div className="relative">
                                                        <select
                                                            value={selectedLeggingsId}
                                                            onChange={(e) => setSelectedLeggingsId(e.target.value === 'none' ? 'none' : Number(e.target.value))}
                                                            className="w-full bg-black/40 border border-gray-600 rounded-lg p-2 appearance-none focus:outline-none focus:border-blue-500 text-white text-sm"
                                                        >
                                                            <option value="none">None</option>
                                                            {leggingsBuilds.map(b => (
                                                                <option key={b.id} value={b.id}>{b.name} (+{b.build_data.enhancementLevel || 0})</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Display */}
                                            <div className="bg-black/20 rounded-lg p-3 border border-white/5 space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Total Health:</span>
                                                    <span className="text-green-400 font-mono font-bold">
                                                        {Math.round(armorStats.health)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Total Defense:</span>
                                                    <span className="text-blue-400 font-mono font-bold">
                                                        {Math.round(armorStats.def)}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <button
                                        onClick={() => fetchSavedBuilds()}
                                        className="w-full px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-300 text-xs font-medium transition-colors"
                                    >
                                        🔄 Refresh Builds
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
                            <Zap size={20} /> Combat Simulation
                        </h2>

                        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {testerMode === 'weapon' ? (
                                    <>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Damage per Hit</div>
                                            <div className="text-2xl font-bold text-white">
                                                {Math.round(weaponStats.damage + ((weaponStats.runeDps || 0) * weaponStats.atkSpeed))}
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-1">Avg. incl. Runes</div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total DPS</div>
                                            <div className="text-2xl font-bold text-orange-400">{dps.toFixed(1)}</div>
                                            {weaponStats.runeDps > 0 && (
                                                <div className="text-[10px] text-purple-400 mt-1">
                                                    (+{weaponStats.runeDps.toFixed(1)} from Runes)
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Time to Kill</div>
                                            <div className="text-2xl font-bold text-white">{timeToKill.toFixed(2)}s</div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Hits to Kill</div>
                                            <div className="text-2xl font-bold text-white">{hitsToKill}</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Damage Taken</div>
                                            <div className="text-2xl font-bold text-red-400">
                                                {Math.max(1, Math.round(enemyDamage.avg * (1 - (armorStats.def / (armorStats.def + 100)))))}
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-1">Per Enemy Hit</div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Defense Reduction</div>
                                            <div className="text-2xl font-bold text-blue-400">
                                                {Math.round((armorStats.def / (armorStats.def + 100)) * 100)}%
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-1">Damage Blocked</div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Time to Die</div>
                                            <div className="text-2xl font-bold text-white">
                                                {(Math.ceil(userCurrentHP / Math.max(1, Math.round(enemyDamage.avg * (1 - (armorStats.def / (armorStats.def + 100)))))) * 1.5).toFixed(2)}s
                                            </div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Hits to Die</div>
                                            <div className="text-2xl font-bold text-white">
                                                {Math.ceil(userCurrentHP / Math.max(1, Math.round(enemyDamage.avg * (1 - (armorStats.def / (armorStats.def + 100))))))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Hit Test Button and Damage Display */}
                            <div className="w-full space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {testerMode === 'weapon' ? (
                                        <>
                                            <button
                                                onClick={handleHit}
                                                disabled={currentEnemyHP <= 0}
                                                className="py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-800 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
                                            >
                                                <Sword size={20} />
                                                HIT!
                                            </button>
                                            <button
                                                onClick={() => setIsAutoAttacking(!isAutoAttacking)}
                                                disabled={currentEnemyHP <= 0}
                                                className={`py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${isAutoAttacking
                                                    ? 'bg-orange-500 shadow-orange-500/50'
                                                    : 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                                                    }`}
                                            >
                                                <Zap size={20} className={isAutoAttacking ? 'animate-pulse' : ''} />
                                                {isAutoAttacking ? 'STOP' : 'AUTO'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleEnemyHit}
                                                disabled={userCurrentHP <= 0}
                                                className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                                            >
                                                <Skull size={20} />
                                                ENEMY HIT!
                                            </button>
                                            <button
                                                onClick={() => setIsEnemyAttacking(!isEnemyAttacking)}
                                                disabled={userCurrentHP <= 0}
                                                className={`py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${isEnemyAttacking
                                                    ? 'bg-purple-500 shadow-purple-500/50'
                                                    : 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                                                    }`}
                                            >
                                                <Zap size={20} className={isEnemyAttacking ? 'animate-pulse' : ''} />
                                                {isEnemyAttacking ? 'STOP' : 'AUTO'}
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Damage Number Animation */}
                                <div className="relative h-16 flex items-center justify-center">
                                    {hitAnimation && (
                                        <div
                                            key={hitAnimation.id}
                                            className="absolute text-5xl font-fredoka font-bold text-red-500 animate-[bounce_0.5s_ease-out] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                            style={{
                                                animation: 'float-up 1s ease-out forwards'
                                            }}
                                        >
                                            -{hitAnimation.damage}
                                        </div>
                                    )}
                                    {enemyHitAnimation && (
                                        <div
                                            key={enemyHitAnimation.id}
                                            className="absolute text-5xl font-fredoka font-bold text-blue-500 animate-[bounce_0.5s_ease-out] drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                            style={{
                                                animation: 'float-up 1s ease-out forwards'
                                            }}
                                        >
                                            -{enemyHitAnimation.damage}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* HP Bars */}
                            <div className="w-full space-y-6">
                                {/* Enemy HP Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400">Enemy HP</span>
                                        {testerMode === 'weapon' && (
                                            <button
                                                onClick={resetHP}
                                                className="text-xs px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300 transition-colors"
                                            >
                                                Reset HP
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-full bg-black/40 rounded-full h-6 overflow-hidden relative border border-white/10">
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                            {Math.round(currentEnemyHP)} / {Math.round(enemyHealth.avg)} HP ({Math.round((currentEnemyHP / enemyHealth.avg) * 100)}%)
                                        </div>
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-out"
                                            style={{ width: `${(currentEnemyHP / enemyHealth.avg) * 100}%` }}
                                        ></div>
                                        {currentEnemyHP === 0 && (
                                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/60">
                                                💀 DEFEATED!
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* User HP Bar (Only in Armor Mode) */}
                                {testerMode === 'armor' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Your HP</span>
                                            <button
                                                onClick={resetHP}
                                                className="text-xs px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300 transition-colors"
                                            >
                                                Reset HP
                                            </button>
                                        </div>
                                        <div className="w-full bg-black/40 rounded-full h-6 overflow-hidden relative border border-white/10">
                                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                {Math.round(userCurrentHP)} / {Math.round(armorStats.health)} HP ({Math.round((userCurrentHP / armorStats.health) * 100)}%)
                                            </div>
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 ease-out"
                                                style={{ width: `${(userCurrentHP / armorStats.health) * 100}%` }}
                                            ></div>
                                            {userCurrentHP === 0 && (
                                                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/60">
                                                    💀 YOU DIED!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 text-center max-w-sm">
                                {testerMode === 'weapon'
                                    ? "*Calculations include average rune damage. Actual combat may vary due to RNG."
                                    : "*Survival stats are based on average enemy damage and simple defense reduction formula."}
                            </div>

                            {activeRunes.length > 0 && (
                                <div className="w-full bg-black/20 rounded-xl p-4 border border-white/5 mt-4">
                                    <h3 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2"><Zap size={14} /> Active Rune Effects</h3>
                                    <div className="space-y-2">
                                        {activeRunes.map((rune, idx) => {
                                            const sim = rune.simulation;
                                            return (
                                                <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                                                    <div className="w-8 h-8 rounded bg-black/40 border border-white/10 shrink-0 overflow-hidden">
                                                        {rune.image && <img src={rune.image} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white flex items-center gap-2">
                                                            {rune.name}
                                                            {sim && (
                                                                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30">
                                                                    {sim.type === 'dot' ? 'DoT' : sim.type === 'instant' ? 'Burst' : 'Buff'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-gray-400">{rune.description}</div>
                                                        {sim && (
                                                            <div className="mt-1 text-gray-500">
                                                                {sim.type === 'dot' && (
                                                                    <span>
                                                                        Deals ~{((sim.damagePercentMin + sim.damagePercentMax) / 2 * 100).toFixed(1)}% DMG/sec for ~{((sim.durationMin + sim.durationMax) / 2).toFixed(1)}s
                                                                        (Chance: {((sim.chanceMin + sim.chanceMax) / 2 * 100).toFixed(0)}%)
                                                                    </span>
                                                                )}
                                                                {sim.type === 'instant' && (
                                                                    <span>
                                                                        Deals ~{((sim.damagePercentMin + sim.damagePercentMax) / 2 * 100).toFixed(1)}% DMG
                                                                        (Chance: {((sim.chanceMin + sim.chanceMax) / 2 * 100).toFixed(0)}%)
                                                                    </span>
                                                                )}
                                                                {sim.type === 'buff' && (
                                                                    <span>
                                                                        Boosts DMG by ~{((sim.damageBoostMin + sim.damageBoostMax) / 2 * 100).toFixed(1)}% when {sim.condition}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DamageTester;
