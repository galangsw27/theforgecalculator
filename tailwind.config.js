/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                card: '#141414',
                'card-border': '#2a2a2a',
                weapon: {
                    DEFAULT: '#FF6600',
                    glow: 'rgba(255, 102, 0, 0.4)',
                    dim: 'rgba(255, 102, 0, 0.1)',
                },
                armor: {
                    DEFAULT: '#19b9b9',
                    glow: 'rgba(25, 185, 185, 0.4)',
                    dim: 'rgba(9, 119, 119, 0.1)',
                },
                rarity: {
                    common: '#8c8c8c',
                    uncommon: '#4CAF50',
                    rare: '#2196F3',
                    epic: '#9c27b0',
                    legendary: '#f0b209',
                    mythical: '#d13429',
                    relic: '#ffeb3b',
                }
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        },
    },
    plugins: [],
}
