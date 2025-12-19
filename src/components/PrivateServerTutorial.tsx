import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Home, MessageSquare, ExternalLink, Info, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const PrivateServerTutorial: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative font-sans">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 py-6 px-8 border-b border-white/5 bg-black/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform">
                            <Home className="text-white" size={20} />
                        </Link>
                        <div>
                            <h1 className="font-fredoka font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Private Server Tutorial
                            </h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">The Forge Assistant</p>
                        </div>
                    </div>
                    <Link
                        to="/calculator"
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <Hammer size={16} />
                        Back to Forge
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="relative z-10 max-w-4xl mx-auto px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6">
                        <Info size={14} className="text-indigo-400" />
                        <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider">Step-by-Step Guide</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-fredoka font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
                        How to Join Private Server
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Follow these simple steps to access our exclusive private server and enjoy a better forging experience.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Step 1 */}
                    <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MessageSquare size={120} className="text-indigo-500" />
                        </div>
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 font-fredoka font-bold text-xl text-indigo-400 border border-indigo-500/30">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    Join Discord Server
                                    <CheckCircle2 size={18} className="text-green-500" />
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Untuk join private server kalian harus join discord dulu. Ini adalah langkah pertama yang wajib dilakukan untuk mendapatkan akses.
                                </p>
                                <a
                                    href="https://link.wiru.app/theforge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
                                >
                                    <MessageSquare size={20} />
                                    Join Discord Now
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Info size={120} className="text-purple-500" />
                        </div>
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 font-fredoka font-bold text-xl text-purple-400 border border-purple-500/30">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    Find Private Server Channel
                                    <CheckCircle2 size={18} className="text-green-500" />
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Cari Channel <span className="text-purple-400 font-bold">#private-server</span> di dalam Discord. Anda bisa join melalui link yang tersedia di channel tersebut secara langsung.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 italic">
                                    <ArrowRight size={14} />
                                    Pastikan anda sudah memverifikasi akun discord anda.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="glass-card rounded-2xl p-8 border border-white/5 hover:border-pink-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles size={120} className="text-pink-500" />
                        </div>
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0 font-fredoka font-bold text-xl text-pink-400 border border-pink-500/30">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    Feedback & Suggestions
                                    <CheckCircle2 size={18} className="text-green-500" />
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Jika ada kritik & saran bisa juga chat di discord ya! Kami sangat menghargai masukan dari para pemain untuk mengembangkan The Forge lebih baik lagi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/calculator"
                        className="inline-flex items-center gap-3 text-gray-500 hover:text-white transition-colors group"
                    >
                        <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
                        Back to Calculator
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-8 border-t border-white/5 mt-20">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Hammer className="text-orange-500" size={20} />
                        <span className="font-fredoka font-bold text-lg">The Forge AI</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Helping you forge the best items in the kingdom.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PrivateServerTutorial;
