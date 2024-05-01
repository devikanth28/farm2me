import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
const appVerison = process.env.REACT_APP_VERSION;

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    debug: false,
    fallbackLng: "en",
    backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json?v='+appVerison,
    },
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: true
    }

});

export default i18n;