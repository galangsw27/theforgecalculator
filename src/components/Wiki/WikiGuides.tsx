import React, { useState } from 'react';
import guidesData from '../../data/guides.json';
import {
    BookOpen,
    Clock,
    User,
    Calendar,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    TrendingUp,
    Shield
} from 'lucide-react';

const WikiGuides: React.FC = () => {
    const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

    const selectedGuide = guidesData.find(g => g.id === selectedGuideId);

    if (selectedGuideId && selectedGuide) {
        return (
            <div className="py-6 max-w-4xl mx-auto">
                <button
                    onClick={() => setSelectedGuideId(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Guides
                </button>

                <article className="glass-card rounded-[2.5rem] overflow-hidden border-white/10">
                    <div className="p-8 lg:p-12">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                {selectedGuide.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Clock size={14} />
                                <span>{selectedGuide.readTime} read</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Calendar size={14} />
                                <span>{selectedGuide.date}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-5xl font-fredoka font-bold text-white mb-8 leading-tight">
                            {selectedGuide.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-12 pb-8 border-b border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {selectedGuide.author[0]}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{selectedGuide.author}</div>
                                <div className="text-xs text-gray-500">Verified Contributor</div>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            {selectedGuide.content.split('\n\n').map((paragraph, i) => {
                                if (paragraph.startsWith('###')) {
                                    return (
                                        <h3 key={i} className="text-xl font-fredoka font-bold text-white mt-8 mb-4 flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                                            {paragraph.replace('### ', '')}
                                        </h3>
                                    );
                                }
                                if (paragraph.startsWith('-')) {
                                    return (
                                        <ul key={i} className="space-y-2 my-4">
                                            {paragraph.split('\n').map((item, j) => (
                                                <li key={j} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 mt-2 shrink-0" />
                                                    {item.replace('- ', '')}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return (
                                    <p key={i} className="text-gray-400 leading-relaxed mb-6 text-lg">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </article>

                <div className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-white/5 text-center">
                    <Sparkles className="text-indigo-400 mx-auto mb-4" size={32} />
                    <h3 className="text-xl font-bold text-white mb-2">Was this guide helpful?</h3>
                    <p className="text-gray-400 mb-6">Join our community to share your own forging tips and tricks!</p>
                    <a
                        href="https://link.wiru.app/theforge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all"
                    >
                        Join Discord Community
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 py-6">
            <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 p-8 lg:p-16">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <BookOpen size={14} />
                        <span>Knowledge Base</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-fredoka font-bold text-white mb-6 leading-tight">
                        Forging <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Guides & Tips</span>
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Master the mechanics of The Forge with our community-driven guides.
                        From basic crafting to advanced multiplier optimization, we've got you covered.
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guidesData.map((guide) => (
                    <button
                        key={guide.id}
                        onClick={() => setSelectedGuideId(guide.id)}
                        className="group text-left relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                {guide.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <Clock size={12} />
                                <span>{guide.readTime} read</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-fredoka font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                            {guide.name}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                            {guide.content.split('\n\n')[0]}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-400 font-bold">
                                    {guide.author[0]}
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{guide.author}</span>
                            </div>
                            <div className="flex items-center gap-1 text-indigo-400 text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                                Read More <ChevronRight size={14} />
                            </div>
                        </div>
                    </button>
                ))}

                {/* Contribution Card */}
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-white/5 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                        <TrendingUp className="text-orange-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-fredoka font-bold text-white mb-4">Share Your Knowledge</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        Have a unique strategy or a secret recipe? Help other players by contributing to our guides.
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
            </div>
        </div>
    );
};

export default WikiGuides;
