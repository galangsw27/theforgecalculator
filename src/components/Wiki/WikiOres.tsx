import React, { useState, useMemo, useEffect } from 'react';
import oresData from '../../data/ores.json';
import {
    Search,
    Filter,
    Gem,
    MapPin,
    TrendingUp,
    DollarSign,
    Zap,
    Info
} from 'lucide-react';

const WikiOres: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    useEffect(() => {
        const handleClickOutside = () => setActiveTooltip(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const rarities = Array.from(new Set(oresData.map(ore => ore.Rarity)));
    const areas = Array.from(new Set(oresData.map(ore => ore.Area)));

    const filteredOres = useMemo(() => {
        return oresData.filter(ore => {
            const matchesSearch = ore.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ore.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRarity = !selectedRarity || ore.Rarity === selectedRarity;
            const matchesArea = !selectedArea || ore.Area === selectedArea;
            return matchesSearch && matchesRarity && matchesArea;
        });
    }, [searchQuery, selectedRarity, selectedArea]);

    const getRarityColor = (rarity: string) => {
        switch (rarity.toLowerCase()) {
            case 'common': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
            case 'uncommon': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'legendary': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'mythical': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'relic': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'divine': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
            case 'exotic': return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="space-y-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-fredoka font-bold text-white mb-2">Ores & Materials Database</h1>
                    <p className="text-gray-400 max-w-2xl">
                        Explore the comprehensive database of all {oresData.length} ores in The Forge.
                        Each ore has unique properties, multipliers, and drop rates that are essential
                        for mastering the art of forging. Use the filters below to find the perfect
                        materials for your next legendary craft.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search ores..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all w-full md:w-64 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedRarity(null);
                            setSelectedArea(null);
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
                    onClick={() => setSelectedRarity(null)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${!selectedRarity ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                >
                    All Rarities
                </button>
                {rarities.map(rarity => (
                    <button
                        key={rarity}
                        onClick={() => setSelectedRarity(rarity)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedRarity === rarity ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                    >
                        {rarity}
                    </button>
                ))}
            </div>

            {/* Ores Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOres.map((ore, idx) => (
                    <div
                        key={idx}
                        className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                    <img src={ore.image} alt={ore.name} className="w-12 h-12 object-contain" />
                                </div>
                                <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-md text-[10px] font-bold border ${getRarityColor(ore.Rarity)}`}>
                                    {ore.Rarity}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Multiplier</div>
                                <div className="text-xl font-fredoka font-bold text-indigo-400">{ore.Multiplier}</div>
                            </div>
                        </div>

                        <h3 className="text-xl font-fredoka font-bold text-white mb-2">{ore.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
                            {ore.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-gray-500" />
                                <span className="text-xs text-gray-300 truncate">{ore.Area}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Zap size={14} className="text-gray-500" />
                                <span className="text-xs text-gray-300">{ore.Chance}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={14} className="text-gray-500" />
                                <span className="text-xs text-gray-300">{ore["Sell Value"]}</span>
                            </div>
                            <div
                                className="flex items-center gap-2 justify-end relative group/trait"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltip(activeTooltip === idx ? null : idx);
                                }}
                            >
                                <Info size={14} className={`transition-colors cursor-help ${activeTooltip === idx ? 'text-indigo-400' : 'text-gray-500 group-hover/trait:text-indigo-400'}`} />
                                <span className="text-[10px] text-indigo-400 font-bold uppercase truncate max-w-[80px] cursor-help">
                                    {ore.Trait !== 'None' ? (ore.Trait.length > 15 ? 'Has Trait' : ore.Trait) : 'No Trait'}
                                </span>

                                {ore.Trait !== 'None' && (
                                    <div className={`absolute bottom-full right-0 mb-2 w-48 p-3 rounded-xl bg-gray-900 border border-indigo-500/30 shadow-2xl transition-all duration-200 z-50 pointer-events-none ${activeTooltip === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1 group-hover/trait:opacity-100 group-hover/trait:visible group-hover/trait:translate-y-0'}`}>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1 tracking-wider">Trait Description</div>
                                        <p className="text-xs text-gray-300 leading-relaxed">
                                            {ore.Trait}
                                        </p>
                                        <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 border-r border-b border-indigo-500/30 rotate-45" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredOres.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-fredoka font-bold text-white mb-2">No ores found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default WikiOres;
