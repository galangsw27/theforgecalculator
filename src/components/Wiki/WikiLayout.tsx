import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    Book,
    Gem,
    Sword,
    Shield,
    ChevronRight,
    Home,
    Search,
    Menu,
    X
} from 'lucide-react';

const WikiLayout: React.FC = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const navItems = [
        { name: 'Wiki Home', path: '/wiki', icon: Home },
        { name: 'Ores', path: '/wiki/ores', icon: Gem },
        { name: 'Weapons', path: '/wiki/weapons', icon: Sword },
        { name: 'Armor', path: '/wiki/armor', icon: Shield },
        { name: 'Guides', path: '/wiki/guides', icon: Book },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <Link to="/wiki" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Book className="text-white" size={16} />
                    </div>
                    <span className="font-fredoka font-bold text-lg tracking-wide">Forge Wiki</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div className="max-w-[1600px] mx-auto flex relative">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:sticky top-0 lg:top-0 h-screen w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl z-40 transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="p-6">
                        <Link to="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                <Home className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="font-fredoka font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    The Forge
                                </h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Back to App</p>
                            </div>
                        </Link>

                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`
                                            flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} className={isActive ? 'text-indigo-400' : 'group-hover:text-white'} />
                                            <span className="font-medium text-sm">{item.name}</span>
                                        </div>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-10 pt-10 border-t border-white/5">
                            <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10">
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Welcome to the unofficial <span className="text-indigo-300 font-bold">Forge Wiki</span>. Explore ores, weapons, and armor data.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 p-4 lg:p-8">
                    <div className="max-w-5xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default WikiLayout;
