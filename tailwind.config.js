/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#050505',
                card: '#0d0d0d',
                'card-border': '#1a1a1a',
                weapon: {
                    DEFAULT: '#FF6B35',
                    glow: 'rgba(255, 107, 53, 0.5)',
                    dim: 'rgba(255, 107, 53, 0.1)',
                },
                armor: {
                    DEFAULT: '#00D4AA',
                    glow: 'rgba(0, 212, 170, 0.5)',
                    dim: 'rgba(0, 212, 170, 0.1)',
                },
                rarity: {
                    common: '#9CA3AF',
                    uncommon: '#22C55E',
                    rare: '#3B82F6',
                    epic: '#A855F7',
                    legendary: '#F59E0B',
                    mythical: '#EF4444',
                    relic: '#FBBF24',
                }
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
            },
            boxShadow: {
                'glow-orange': '0 0 30px -5px rgba(255, 107, 53, 0.5)',
                'glow-teal': '0 0 30px -5px rgba(0, 212, 170, 0.5)',
                'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.5)',
                'glow-gold': '0 0 30px -5px rgba(251, 191, 36, 0.5)',
                'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                pulse_glow: {
                    '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                gradient_shift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                glow_pulse: {
                    '0%, 100%': { boxShadow: '0 0 20px -5px var(--glow-color, rgba(255,107,53,0.5))' },
                    '50%': { boxShadow: '0 0 40px -5px var(--glow-color, rgba(255,107,53,0.7))' },
                },
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
                'shimmer': 'shimmer 2s ease-in-out infinite',
                'pulse-glow': 'pulse_glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'gradient-shift': 'gradient_shift 3s ease infinite',
                'glow-pulse': 'glow_pulse 2s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            },
        },
    },
    plugins: [],
}
