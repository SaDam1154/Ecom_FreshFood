/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
    theme: {
        extend: {
            spacing: {
                'h-header': 'var(--h-header)',
            },
            maxWidth: {
                container: '1200px',
            },
            boxShadow: {
                test: '0 0 1px 1px red',
            },
            colors: {
                primary: '#f472b6',
                'primary-dark': '#ec4899',
            },
        },
    },
    plugins: [],
};
