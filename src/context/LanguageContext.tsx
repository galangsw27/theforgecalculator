import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Landing Page
        'landing.badge': 'Powered by AI • Version 2.0',
        'landing.title1': 'Ultimate',
        'landing.title2': 'The Forge Roblox',
        'landing.title3': 'Assistant',
        'landing.subtitle': 'Master the art of forging with',
        'landing.subtitleHighlight': 'AI-powered calculations',
        'landing.subtitleEnd': ', discover the best recipes, and create legendary weapons & armor in The Forge.',
        'landing.startForging': 'The AI Forge Calculator',
        'landing.playGame': 'Play The Forge',
        'landing.weapons': 'Weapons',
        'landing.weaponsDesc': 'Calculate damage multipliers',
        'landing.armor': 'Armor',
        'landing.armorDesc': 'Optimize defense stats',
        'landing.traits': 'Traits',
        'landing.traitsDesc': 'Unlock special abilities',
        'landing.features': 'Powerful Features',
        'landing.featuresSubtitle': 'Everything you need to become a master blacksmith in The Forge',
        'landing.forgeCalculator': 'Forge Calculator',
        'landing.forgeCalculatorDesc': 'Calculate precise forge outcomes with real-time probability analysis. Mix ores and preview your chances instantly.',
        'landing.aiAssistant': 'AI Assistant',
        'landing.aiAssistantDesc': 'Ask anything about The Forge! Our intelligent AI chatbot helps you find recipes, strategies, and tips instantly.',
        'landing.bestRecipes': 'Best Recipes',
        'landing.bestRecipesDesc': 'Access a curated collection of top-tier weapon and armor recipes with optimal ore combinations.',
        'landing.traitSystem': 'Trait System',
        'landing.traitSystemDesc': 'Understand how ore percentages affect traits. Maximize your item\'s special abilities with smart mixing.',
        'landing.oresDatabase': 'All Ores Database',
        'landing.oresDatabaseDesc': 'Complete database of every ore from Stonewake, Kingdom, Goblin mines, and enemy drops.',
        'landing.inventoryTracker': 'Inventory Tracker',
        'landing.inventoryTrackerDesc': 'Keep track of all your forged items, their stats, and total value in one convenient place.',
        'landing.about': 'About',
        'landing.aboutTitle': 'The Forge AI',
        'landing.aboutDesc': 'The Forge Roblox Assistant is your ultimate companion for mastering The Forge game. Built with cutting-edge AI technology, it provides accurate calculations, intelligent recommendations, and comprehensive game information to help you craft the most powerful items possible.',
        'landing.forRoblox': '🎮 For Roblox Players',
        'landing.aiPowered': '🤖 AI Powered',
        'landing.realtime': '⚡ Real-time Calculations',
        'landing.completeWiki': '📚 Complete Wiki',
        'landing.readyForge': 'Ready to',
        'landing.forge': 'Forge',
        'landing.legendary': 'Something Legendary?',
        'landing.joinPlayers': 'Join thousands of Roblox players using The Forge AI Assistant',
        'landing.enterForge': 'Enter The Forge',
        'landing.notAffiliated': 'Not affiliated with Roblox Corporation',
        'landing.nav.features': 'Features',
        'landing.nav.about': 'About',

        // Calculator App
        'app.calculator': 'Calculator',
        'app.inventory': 'Inventory',
        'app.forgeChances': 'Forge Chances',
        'app.basedOn': 'Based on',
        'app.ores': 'ores',
        'app.addOres': 'Add at least 3 ores to see probabilities.',
        'app.activeTraits': 'Active Traits',
        'app.noTraits': 'No traits active. (Need >10% mix)',
        'app.multiplier': 'Multiplier',
        'app.weapon': 'Weapon',
        'app.armor': 'Armor',
        'app.empty': 'Empty',
        'app.forging': 'FORGING...',
        'app.forgeItem': 'FORGE ITEM',
        'app.showRecipes': 'Show',
        'app.hideRecipes': 'Hide',
        'app.bestRecipes': 'Best Recipes',
        'app.weapons': 'Weapons',
        'app.searchOres': 'Search ores...',
        'app.noOres': 'No ores found.',
        'app.forgeAgain': 'Forge Again',
        'app.forgeHistory': 'Forge History',
        'app.noItems': 'No items forged yet.',
        'app.totalValue': 'Total Value',
        'app.clearHistory': 'Clear History',
        'app.thanksTo': 'Thanks To | Forgewiki & Nipozy & Trhees',
    },
    id: {
        // Landing Page
        'landing.badge': 'Didukung AI • Versi 2.0',
        'landing.title1': 'Asisten',
        'landing.title2': 'The Forge Roblox',
        'landing.title3': 'Terbaik',
        'landing.subtitle': 'Kuasai seni forging dengan',
        'landing.subtitleHighlight': 'kalkulasi berbasis AI',
        'landing.subtitleEnd': ', temukan resep terbaik, dan ciptakan senjata & armor legendaris di The Forge.',
        'landing.startForging': 'The AI Forge Calculator',
        'landing.playGame': 'Main The Forge',
        'landing.weapons': 'Senjata',
        'landing.weaponsDesc': 'Hitung multiplier damage',
        'landing.armor': 'Armor',
        'landing.armorDesc': 'Optimasi stat pertahanan',
        'landing.traits': 'Trait',
        'landing.traitsDesc': 'Buka kemampuan spesial',
        'landing.features': 'Fitur Unggulan',
        'landing.featuresSubtitle': 'Semua yang kamu butuhkan untuk menjadi master blacksmith di The Forge',
        'landing.forgeCalculator': 'Kalkulator Forge',
        'landing.forgeCalculatorDesc': 'Hitung hasil forge dengan analisis probabilitas real-time. Campur ore dan lihat peluangmu secara instan.',
        'landing.aiAssistant': 'Asisten AI',
        'landing.aiAssistantDesc': 'Tanya apa saja tentang The Forge! Chatbot AI kami membantu menemukan resep, strategi, dan tips secara instan.',
        'landing.bestRecipes': 'Resep Terbaik',
        'landing.bestRecipesDesc': 'Akses koleksi resep senjata dan armor terbaik dengan kombinasi ore yang optimal.',
        'landing.traitSystem': 'Sistem Trait',
        'landing.traitSystemDesc': 'Pahami bagaimana persentase ore mempengaruhi trait. Maksimalkan kemampuan spesial itemmu dengan mixing yang tepat.',
        'landing.oresDatabase': 'Database Semua Ore',
        'landing.oresDatabaseDesc': 'Database lengkap setiap ore dari Stonewake, Kingdom, Goblin mines, dan drop musuh.',
        'landing.inventoryTracker': 'Pelacak Inventory',
        'landing.inventoryTrackerDesc': 'Lacak semua item yang sudah di-forge, stat, dan total nilai dalam satu tempat.',
        'landing.about': 'Tentang',
        'landing.aboutTitle': 'The Forge AI',
        'landing.aboutDesc': 'The Forge Roblox Assistant adalah pendamping terbaik untuk menguasai game The Forge. Dibangun dengan teknologi AI mutakhir, memberikan kalkulasi akurat, rekomendasi cerdas, dan informasi game lengkap untuk membantumu membuat item paling powerful.',
        'landing.forRoblox': '🎮 Untuk Pemain Roblox',
        'landing.aiPowered': '🤖 Didukung AI',
        'landing.realtime': '⚡ Kalkulasi Real-time',
        'landing.completeWiki': '📚 Wiki Lengkap',
        'landing.readyForge': 'Siap untuk',
        'landing.forge': 'Forge',
        'landing.legendary': 'Sesuatu yang Legendaris?',
        'landing.joinPlayers': 'Bergabung dengan ribuan pemain Roblox yang menggunakan The Forge AI Assistant',
        'landing.enterForge': 'Masuk The Forge',
        'landing.notAffiliated': 'Tidak berafiliasi dengan Roblox Corporation',
        'landing.nav.features': 'Fitur',
        'landing.nav.about': 'Tentang',

        // Calculator App
        'app.calculator': 'Kalkulator',
        'app.inventory': 'Inventory',
        'app.forgeChances': 'Peluang Forge',
        'app.basedOn': 'Berdasarkan',
        'app.ores': 'ore',
        'app.addOres': 'Tambah minimal 3 ore untuk melihat probabilitas.',
        'app.activeTraits': 'Trait Aktif',
        'app.noTraits': 'Tidak ada trait aktif. (Butuh >10% mix)',
        'app.multiplier': 'Multiplier',
        'app.weapon': 'Senjata',
        'app.armor': 'Armor',
        'app.empty': 'Kosong',
        'app.forging': 'FORGING...',
        'app.forgeItem': 'FORGE ITEM',
        'app.showRecipes': 'Tampilkan',
        'app.hideRecipes': 'Sembunyikan',
        'app.bestRecipes': 'Resep Terbaik',
        'app.weapons': 'Senjata',
        'app.searchOres': 'Cari ore...',
        'app.noOres': 'Ore tidak ditemukan.',
        'app.forgeAgain': 'Forge Lagi',
        'app.forgeHistory': 'Riwayat Forge',
        'app.noItems': 'Belum ada item yang di-forge.',
        'app.totalValue': 'Total Nilai',
        'app.clearHistory': 'Hapus Riwayat',
        'app.thanksTo': 'Terima Kasih | Forgewiki & Nipozy & Trhees',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Check localStorage first
        const saved = localStorage.getItem('forge-lang');
        if (saved === 'en' || saved === 'id') return saved;

        // Auto-detect based on browser language
        const browserLang = navigator.language || (navigator as any).userLanguage;
        if (browserLang.startsWith('id')) return 'id';
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('forge-lang', language);
    }, [language]);

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language Switcher Component
export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'id'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
            >
                ID
            </button>
        </div>
    );
};
