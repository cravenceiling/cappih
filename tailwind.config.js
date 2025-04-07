/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                main: 'var(--main)',
                overlay: 'var(--overlay)',
                bg: 'var(--bg)',
                bw: 'var(--bw)',
                blank: 'var(--blank)',
                text: 'var(--text)',
                mtext: 'var(--mtext)',
                border: 'var(--border)',
                ring: 'var(--ring)',
                ringOffset: 'var(--ring-offset)',
                secondaryBlack: '#212121'
            },
            borderRadius: {
                base: '4px',
            },
            boxShadow: {
                shadow: 'var(--shadow)',
                'neobrutalism': '5px 5px 0px 0px rgba(0, 0, 0, 0.9)',
                'neobrutalism-sm': '3px 3px 0px 0px rgba(0, 0, 0, 0.9)',
                'neobrutalism-lg': '8px 8px 0px 0px rgba(0, 0, 0, 0.9)',
            },
            translate: {
                boxShadowX: '4px',
                boxShadowY: '4px',
                reverseBoxShadowX: '-4px',
                reverseBoxShadowY: '-4px'
            },
            fontWeight: {
                base: '400',
                heading: '700'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
        }
    }, plugins: [require("tailwindcss-animate")],
}
