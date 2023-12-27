/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js', './node_modules/flowbite/**/*.js'],
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
                'primary-color': '#var(--primary-color)',
                'primary-dark': '#ec4899',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
