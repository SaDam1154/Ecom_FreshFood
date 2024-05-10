import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslate from './en.json';
import viTranslate from './vi.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'En',
    debug: true,
    lng: 'En',
    resources: {
        En: {
            translation: enTranslate,
        },
        Vi: {
            translation: viTranslate,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
