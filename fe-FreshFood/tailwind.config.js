/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        './node_modules/flowbite/**/*.js',
    ],
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
                primary: {
                    50: '#edfcf7',
                    100: '#d3f8e9',
                    200: '#aaf0d8',
                    300: '#73e2c3',
                    400: '#3bcca8',
                    500: '#17b290',
                    600: '#0da487',
                    700: '#097362',
                    800: '#0a5b4e',
                    900: '#094b42',
                    950: '#042a25',
                },
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
