import React, { useState, useMemo } from 'react';
import weaponsData from '../../data/weapons.json';
import { ITEM_IMAGES } from '../../../constants';
import {
    Search,
    Filter,
    Sword,
    Zap,
    Target,
    DollarSign,
    Info,
    Shield
} from 'lucide-react';

const WikiWeapons: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const weaponTypes = Array.from(new Set(weaponsData.map(w => w.type)));

    const filteredWeapons = useMemo(() => {
        return weaponsData.filter(w => {
            const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                w.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = !selectedType || w.type === selectedType;
            return matchesSearch && matchesType;
        });
    }, [searchQuery, selectedType]);

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'dagger': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'straight sword': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
            case 'katana': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'great sword': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'great axe': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'colossal sword': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'mace': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'spear': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
            case 'gauntlet': return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="space-y-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-fredoka font-bold text-white mb-2">Weapons Arsenal</h1>
                    <p className="text-gray-400">Detailed statistics for all {weaponsData.length} craftable weapons.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search weapons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all w-full md:w-64 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedType(null);
                            setSearchQuery('');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${!selectedType ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                >
                    All Types
                </button>
                {weaponTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedType === type ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWeapons.map((weapon, idx) => (
                    <div
                        key={idx}
                        className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                    {ITEM_IMAGES[weapon.name] ? (
                                        <img src={ITEM_IMAGES[weapon.name]} alt={weapon.name} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <Sword className="text-gray-600" size={32} />
                                    )}
                                </div>
                                <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-md text-[10px] font-bold border ${getTypeColor(weapon.type)}`}>
                                    {weapon.type}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Damage</div>
                                <div className="text-xl font-fredoka font-bold text-orange-400">{weapon.stats.Damage}</div>
                            </div>
                        </div>

                        <h3 className="text-xl font-fredoka font-bold text-white mb-2">{weapon.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {weapon.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-gray-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Atk Speed</span>
                                    <span className="text-xs text-gray-300">{weapon.stats["Attack Speed"]}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Target size={14} className="text-gray-500" />
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Range</span>
                                    <span className="text-xs text-gray-300">{weapon.stats.Range}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={14} className="text-gray-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Cost</span>
                                    <span className="text-xs text-gray-300">{weapon.cost}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Info size={14} className="text-gray-500" />
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Wiki</span>
                                    <a href={weapon.url} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-400 font-bold hover:underline">View Source</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredWeapons.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <Sword size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-fredoka font-bold text-white mb-2">No weapons found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default WikiWeapons;
