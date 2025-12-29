import React from 'react';
import { Link } from 'react-router-dom';
import {
    Gem,
    Sword,
    Shield,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Clock
} from 'lucide-react';

const WikiHome: React.FC = () => {
    const categories = [
        {
            name: 'Ores',
            description: 'Discover the raw materials of the forge. From common Stone to divine Heavenite.',
            path: '/wiki/ores',
            icon: Gem,
            color: 'from-blue-500 to-cyan-500',
            count: '76 Ores'
        },
        {
            name: 'Weapons',
            description: 'Explore the arsenal of the forge. Daggers, Katanas, and Colossal Swords.',
            path: '/wiki/weapons',
            icon: Sword,
            color: 'from-orange-500 to-red-600',
            count: '30 Weapons'
        },
        {
            name: 'Armor',
            description: 'Review the defensive gear. Helmets, Chestplates, and Leggings for all tiers.',
            path: '/wiki/armor',
            icon: Shield,
            color: 'from-emerald-500 to-teal-600',
            count: '21 Armor Pieces'
        }
    ];

    return (
        <div className="space-y-12 py-6">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 p-8 lg:p-16">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        <span>The Ultimate Database</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-fredoka font-bold text-white mb-6 leading-tight">
                        Welcome to the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Forge Wiki</span>
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        Your comprehensive guide to everything in The Forge. Explore detailed stats,
                        drop rates, and crafting recipes for every item in the game.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/wiki/ores"
                            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20"
                        >
                            Start Exploring
                        </Link>
                        <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                            <TrendingUp size={18} className="text-green-400" />
                            <span className="text-sm font-medium">Updated for v1.2.0</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-fredoka font-bold text-white">Browse Categories</h2>
                    <div className="h-px flex-1 mx-6 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.name}
                                to={cat.path}
                                className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-[0.03] group-hover:opacity-[0.08] blur-2xl transition-opacity`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="text-white" size={28} />
                                </div>

                                <h3 className="text-xl font-fredoka font-bold text-white mb-3 flex items-center gap-2">
                                    {cat.name}
                                    <ChevronRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {cat.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <Clock size={12} />
                                    <span>{cat.count}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Featured Guides Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-fredoka font-bold text-white">Featured Forging Guides</h2>
                    <div className="h-px flex-1 mx-6 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        to="/wiki/guides"
                        className="group p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
                    >
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Beginner's Guide to The Forge</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            New to the game? Learn the basics of mining, refining, and your first forges.
                            We cover everything from Stonewake's Cross to your first Rare weapon.
                        </p>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            Read Guide <ChevronRight size={14} />
                        </span>
                    </Link>

                    <Link
                        to="/wiki/guides"
                        className="group p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                    >
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Advanced Multiplier Strategies</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Master the math behind the forge. Learn how to combine high-tier ores like
                            Heavenite and Voidfractal to achieve 100x+ damage multipliers.
                        </p>
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                            Read Guide <ChevronRight size={14} />
                        </span>
                    </Link>
                </div>
            </section>

            {/* Quick Links / Stats */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-white/5">
                    <h3 className="text-lg font-fredoka font-bold text-white mb-4">Recent Updates</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'New Ores Added', date: '2 hours ago', desc: 'Added Mistvein, Lgarite, and Voidfractal data.' },
                            { title: 'Stat Calculation Fix', date: '5 hours ago', desc: 'Updated all weapon and armor base stats.' },
                            { title: 'Wiki Launch', date: '1 day ago', desc: 'Official Forge Wiki is now live!' }
                        ].map((update, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-200">{update.title}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{update.date}</p>
                                    <p className="text-xs text-gray-400">{update.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-white/5 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="text-orange-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-fredoka font-bold text-white mb-4">Contribute to the Wiki</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        Found a mistake or have new data? Join our community and help us keep the database accurate.
                    </p>
                    <a
                        href="https://link.wiru.app/theforge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all mx-auto inline-block"
                    >
                        Join Discord
                    </a>
                </div>
            </section>
        </div>
    );
};

export default WikiHome;
