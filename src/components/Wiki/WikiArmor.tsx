import React, { useState, useMemo } from 'react';
import armorData from '../../data/armor.json';
import { ITEM_IMAGES } from '../../../constants';
import {
    Search,
    Filter,
    Shield,
    Heart,
    ShieldAlert,
    DollarSign,
    Info,
    Sparkles
} from 'lucide-react';

const WikiArmor: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const armorTypes = Array.from(new Set(armorData.map(a => a.type)));

    const filteredArmor = useMemo(() => {
        return armorData.filter(a => {
            const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = !selectedType || a.type === selectedType;
            return matchesSearch && matchesType;
        });
    }, [searchQuery, selectedType]);

    const getTypeColor = (type: string) => {
        if (type.includes('Helmet')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        if (type.includes('Chestplate')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (type.includes('Leggings')) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    };

    return (
        <div className="space-y-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-fredoka font-bold text-white mb-2">Armor Collection</h1>
                    <p className="text-gray-400">Protective gear and defensive statistics for all {armorData.length} pieces.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search armor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all w-full md:w-64 text-sm"
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
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${!selectedType ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                >
                    All Parts
                </button>
                {armorTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedType === type ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Armor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArmor.map((armor, idx) => (
                    <div
                        key={idx}
                        className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                    {ITEM_IMAGES[armor.name] ? (
                                        <img src={ITEM_IMAGES[armor.name]} alt={armor.name} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <Shield className="text-gray-600" size={32} />
                                    )}
                                </div>
                                <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-md text-[10px] font-bold border ${getTypeColor(armor.type)}`}>
                                    {armor.type}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Defense</div>
                                <div className="text-xl font-fredoka font-bold text-emerald-400">{armor.stats.Defense}</div>
                            </div>
                        </div>

                        <h3 className="text-xl font-fredoka font-bold text-white mb-2">{armor.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {armor.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Heart size={14} className="text-red-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Health</span>
                                    <span className="text-xs text-gray-300">{armor.stats.Health}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <ShieldAlert size={14} className="text-gray-500" />
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Rarity</span>
                                    <span className="text-xs text-gray-300">{armor.rarity}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={14} className="text-gray-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Cost</span>
                                    <span className="text-xs text-gray-300">{armor.cost}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Sparkles size={14} className="text-gray-500" />
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Chance</span>
                                    <span className="text-xs text-gray-300">{armor.chance}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredArmor.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <Shield size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-fredoka font-bold text-white mb-2">No armor found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default WikiArmor;
