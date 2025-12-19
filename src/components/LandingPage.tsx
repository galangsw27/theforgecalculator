import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Sparkles, Bot, Sword, Shield, Zap, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { useLanguage, LanguageSwitcher } from '../context/LanguageContext';

const LandingPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-teal-600/10" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
            <nav className="relative z-50 py-6 px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
                            <Hammer className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="font-fredoka font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                The Forge AI
                            </h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Roblox Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">{t('landing.nav.features')}</a>
                        <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">{t('landing.nav.about')}</a>
                        <LanguageSwitcher />

                        <a
                            href="https://www.roblox.com/games/76558904092080/The-Forge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 items-center gap-2 whitespace-nowrap"
                        >
                            {t('landing.playGame')}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-8">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
                        <Sparkles size={14} className="text-orange-400" />
                        <span className="text-xs text-gray-300">{t('landing.badge')}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-fredoka font-bold mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                            {t('landing.title1')}
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 drop-shadow-[0_0_30px_rgba(255,107,53,0.5)]">
                            {t('landing.title2')}
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
                            {t('landing.title3')}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('landing.subtitle')} <span className="text-orange-400 font-semibold">{t('landing.subtitleHighlight')}</span>
                        {t('landing.subtitleEnd')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            to="/calculator"
                            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1 hover:scale-105"
                        >
                            <Hammer className="group-hover:rotate-12 transition-transform" />
                            {t('landing.startForging')}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <a
                            href="https://www.roblox.com/games/76558904092080/The-Forge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                            <Bot className="text-teal-400" />
                            {t('landing.playGame')}
                            <ExternalLink size={18} />
                        </a>
                        <Link
                            to="/private-server"
                            className="group px-8 py-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-500/20 transition-all backdrop-blur-sm"
                        >
                            <ExternalLink className="text-indigo-400" />
                            Join Private Server
                        </Link>
                    </div>

                    {/* Preview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <Link to="/calculator" className="glass-card rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Sword className="text-orange-400" size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-1">{t('landing.weapons')}</h3>
                            <p className="text-xs text-gray-500">{t('landing.weaponsDesc')}</p>
                        </Link>
                        <Link to="/calculator" className="glass-card rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Shield className="text-teal-400" size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-1">{t('landing.armor')}</h3>
                            <p className="text-xs text-gray-500">{t('landing.armorDesc')}</p>
                        </Link>
                        <Link to="/calculator" className="glass-card rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Zap className="text-purple-400" size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-1">{t('landing.traits')}</h3>
                            <p className="text-xs text-gray-500">{t('landing.traitsDesc')}</p>
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <ChevronDown className="text-gray-600" size={32} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-24 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-fredoka font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {t('landing.features')}
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            {t('landing.featuresSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-orange-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Hammer className="text-orange-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.forgeCalculator')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.forgeCalculatorDesc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-teal-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Bot className="text-teal-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.aiAssistant')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.aiAssistantDesc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Sparkles className="text-purple-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.bestRecipes')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.bestRecipesDesc')}
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-yellow-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="text-yellow-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.traitSystem')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.traitSystemDesc')}
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-blue-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Sword className="text-blue-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.oresDatabase')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.oresDatabaseDesc')}
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="glass-card rounded-2xl p-6 hover:border-pink-500/30 transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="text-pink-400" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t('landing.inventoryTracker')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('landing.inventoryTrackerDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 py-24 px-8 bg-gradient-to-b from-transparent to-black/50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card rounded-3xl p-8 md:p-12">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/30">
                            <Hammer className="text-white" size={40} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-fredoka font-bold mb-4">
                            {t('landing.about')} <span className="text-orange-400">{t('landing.aboutTitle')}</span>
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {t('landing.aboutDesc')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                            <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                {t('landing.forRoblox')}
                            </span>
                            <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                {t('landing.aiPowered')}
                            </span>
                            <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                {t('landing.realtime')}
                            </span>
                            <span className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                {t('landing.completeWiki')}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="relative z-10 py-16 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-fredoka font-bold mb-4">
                        {t('landing.readyForge')} <span className="text-orange-400">{t('landing.forge')}</span> {t('landing.legendary')}
                    </h2>
                    <p className="text-gray-500 mb-8">
                        {t('landing.joinPlayers')}
                    </p>
                    <Link
                        to="/calculator"
                        className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-xl flex items-center justify-center gap-3 mx-auto hover:shadow-2xl hover:shadow-orange-500/40 transition-all hover:-translate-y-2 hover:scale-105 w-fit"
                    >
                        <Hammer className="group-hover:rotate-12 transition-transform" size={24} />
                        {t('landing.enterForge')}
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-8 px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Hammer className="text-orange-500" size={16} />
                        <span className="text-sm text-gray-500">The Forge AI © 2024</span>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                        Thanks To | Forgewiki & Nipozy & Trhees
                    </p>
                    <div className="text-xs text-gray-600">
                        {t('landing.notAffiliated')}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
