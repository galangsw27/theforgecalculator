import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sword, Shield, Skull, Zap, ArrowLeft, Save, ChevronDown, Crown } from 'lucide-react';
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

    // Custom Weapon Stats
    const [customDamage, setCustomDamage] = useState<number>(10);
    const [customAtkSpeed, setCustomAtkSpeed] = useState<number>(1.0);

    useEffect(() => {
        if (user) {
            fetchSavedBuilds();
        }
    }, [user]);

    const fetchSavedBuilds = async () => {
        if (!supabase || !user) return;
        const { data } = await supabase
            .from('builds')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setSavedBuilds(data);
    };

    const enemy = enemiesData[selectedEnemyIndex];
    const enemyHealth = useMemo(() => parseRange(enemy.Health), [enemy]);
    const enemyDamage = useMemo(() => parseRange(enemy.Damage), [enemy]);

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

            return {
                damage: enhancedDamage,
                atkSpeed: item.stats.atkSpeed || 1.0,
                name: `${build.name} (+${level})`,
                runes: runes,
                runeDps: runeDps
            };
        }
        return { damage: 0, atkSpeed: 1, name: 'Unknown', runes: [], runeDps: 0 };
    }, [selectedBuildId, savedBuilds, customDamage, customAtkSpeed]);

    // Simulation
    const totalDps = (weaponStats.damage * weaponStats.atkSpeed) + (weaponStats.runeDps || 0);
    const dps = totalDps;
    const timeToKill = enemyHealth.avg / dps;
    const hitsToKill = Math.ceil(enemyHealth.avg / (weaponStats.damage + ((weaponStats.runeDps || 0) / weaponStats.atkSpeed)));

    // Rune Effects Text
    const activeRunes = (weaponStats.runes || []).filter(r => r !== null);

    if (!profile?.is_premium) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center max-w-md">
                    <Crown size={48} className="mx-auto text-amber-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
                    <p className="text-gray-400 mb-6">The Damage Tester is available only for Premium users.</p>
                    <Link to="/" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-fredoka font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Damage Tester
                    </h1>
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
                                    {enemiesData.map((e, i) => (
                                        <option key={i} value={i}>{e.name} (Lvl {e.Level})</option>
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

                        {/* Weapon Selection */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-400">
                                <Sword size={20} /> Select Weapon
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
                                </div>
                            ) : (
                                <div className="relative">
                                    <select
                                        value={selectedBuildId}
                                        onChange={(e) => setSelectedBuildId(Number(e.target.value))}
                                        className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 appearance-none focus:outline-none focus:border-orange-500 text-white"
                                    >
                                        {savedBuilds.map(b => (
                                            <option key={b.id} value={b.id}>{b.name} ({b.build_data.itemName})</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
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
                            <div className="text-center">
                                <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Hits to Kill</div>
                                <div className="text-6xl font-fredoka font-bold text-white drop-shadow-lg">
                                    {hitsToKill} <span className="text-2xl text-gray-500 font-sans font-normal">hits</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 w-full">
                                <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Time to Kill</div>
                                    <div className="text-2xl font-bold text-white">{timeToKill.toFixed(2)}s</div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl text-center border border-white/5">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total DPS</div>
                                    <div className="text-2xl font-bold text-orange-400">{dps.toFixed(1)}</div>
                                    {weaponStats.runeDps > 0 && (
                                        <div className="text-xs text-purple-400 mt-1">
                                            (+{weaponStats.runeDps.toFixed(1)} from Runes)
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold z-10 text-white mix-blend-difference">
                                    ENEMY HP: {enemyHealth.avg}
                                </div>
                                <div className="h-full bg-red-600 w-full"></div>
                            </div>
                            <div className="text-xs text-gray-500 text-center max-w-sm">
                                *Calculations include average rune damage. Actual combat may vary due to RNG.
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
