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
        'landing.subtitle': 'Master the art of forging with our ',
        'landing.subtitleHighlight': 'advanced AI-powered calculations',
        'landing.subtitleEnd': '. Discover the best recipes, optimize your gear, and create legendary weapons & armor in The Forge Roblox. Our assistant provides real-time data and intelligent recommendations to help you dominate the game.',
        'landing.startForging': 'Open AI Forge Calculator',
        'landing.playGame': 'Play The Forge on Roblox',
        'landing.weapons': 'Weapon Forging',
        'landing.weaponsDesc': 'Calculate damage multipliers and optimize your weapon stats for maximum DPS.',
        'landing.armor': 'Armor Crafting',
        'landing.armorDesc': 'Optimize defense stats and health bonuses to survive the toughest bosses.',
        'landing.traits': 'Special Traits',
        'landing.traitsDesc': 'Unlock and understand special abilities that give you the edge in combat.',
        'landing.features': 'Advanced Assistant Features',
        'landing.featuresSubtitle': 'The most comprehensive toolset designed specifically for The Forge Roblox players.',
        'landing.forgeCalculator': 'Real-time Forge Calculator',
        'landing.forgeCalculatorDesc': 'Our calculator uses advanced algorithms to predict forge outcomes with high precision. Mix different ores and see your potential multipliers, traits, and item types instantly before you spend your hard-earned resources.',
        'landing.aiAssistant': 'Intelligent AI Chatbot',
        'landing.aiAssistantDesc': 'Got a question about a specific ore or weapon? Our AI assistant is trained on the latest game data. Ask about recipes, drop locations, or strategy tips and get instant, accurate answers to help your progression.',
        'landing.bestRecipes': 'Curated Recipe Database',
        'landing.bestRecipesDesc': 'Stop wasting ores on trial and error. Access our database of the most efficient recipes discovered by top players. We provide the exact ore combinations needed for high-tier weapons and armor sets.',
        'landing.traitSystem': 'Deep Trait Analysis',
        'landing.traitSystemDesc': 'Every ore has unique properties. Our system analyzes how different percentages of ores in your mix affect the final traits of your item. Maximize your build\'s potential with smart, data-driven mixing strategies.',
        'landing.oresDatabase': 'Comprehensive Ore Wiki',
        'landing.oresDatabaseDesc': 'A complete encyclopedia of every ore in the game. From basic Stone to the rarest Divine and Exotic ores, we provide detailed stats, sell values, and exact drop chances for every mining area.',
        'landing.inventoryTracker': 'Build & Inventory Manager',
        'landing.inventoryTrackerDesc': 'Save your best forges and track your progress. Our inventory system allows you to compare different builds, calculate total value, and keep a history of your most successful crafting attempts.',
        'landing.about': 'About The Project',
        'landing.aboutTitle': 'The Forge AI Assistant',
        'landing.aboutDesc': 'The Forge AI is an independent community project dedicated to providing the best possible tools for players of The Forge on Roblox. Our mission is to simplify complex game mechanics through technology, making high-level forging accessible to everyone. We constantly update our database to reflect the latest game patches and community discoveries.',
        'landing.forRoblox': '🎮 Optimized for Roblox',
        'landing.aiPowered': '🤖 Powered by Gemini AI',
        'landing.realtime': '⚡ Instant Calculations',
        'landing.completeWiki': '📚 Extensive Game Wiki',
        'landing.readyForge': 'Are you ready to',
        'landing.forge': 'Forge',
        'landing.legendary': 'your own Legend?',
        'landing.joinPlayers': 'Join thousands of master blacksmiths who use our tools every day to craft superior gear.',
        'landing.enterForge': 'Start Using Calculator',
        'landing.notAffiliated': 'This is a fan-made tool and is not affiliated with Roblox Corporation or the official developers of The Forge.',
        'landing.nav.features': 'Features',
        'landing.nav.about': 'About',
        'landing.nav.howtoplay': 'How to Play',
        'landing.nav.tips': 'Forging Tips',

        // New Sections for AdSense
        'landing.howtoplay.title': 'How to Play The Forge',
        'landing.howtoplay.step1.title': '1. Gather Resources',
        'landing.howtoplay.step1.desc': 'Explore different areas like Stonewake\'s Cross, Forgotten Kingdom, and Frostpire to mine various ores. Each area contains unique materials with different rarities and multipliers.',
        'landing.howtoplay.step2.title': '2. Mix and Match',
        'landing.howtoplay.step2.desc': 'Bring your ores to the forge. The combination of ores you use determines the final stats, traits, and type of item you create. Use our calculator to find the perfect mix.',
        'landing.howtoplay.step3.title': '3. Craft Legendary Gear',
        'landing.howtoplay.step3.desc': 'Once you have the right recipe, forge your item! Higher multipliers and rare traits will help you defeat stronger enemies and progress to new, more challenging areas.',

        'landing.tips.title': 'Expert Forging Tips',
        'landing.tips.tip1.title': 'Understand Multipliers',
        'landing.tips.tip1.desc': 'The total multiplier of your forge is an average of the ores used. Using a single high-multiplier ore with many low-multiplier ones will significantly lower your final stats.',
        'landing.tips.tip2.title': 'Trait Thresholds',
        'landing.tips.tip2.desc': 'Most traits require at least a 10% concentration of a specific ore in the mix to activate. Pay close attention to the percentages in our calculator to ensure your traits are active.',
        'landing.tips.tip3.title': 'Area Specific Items',
        'landing.tips.tip3.desc': 'Certain weapon and armor variants can only be forged using ores from specific areas. Check our Wiki to see which materials are required for the gear you want.',

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
