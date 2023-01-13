import {i18next} from "i18next";
import english from "./english";
// import french from "./french";
import arabic from "./arabic";
import { initReactI18next } from "react-i18next";


i18next.use(initReactI18next).init({
    log: 'en',
    resources:{
        en: english,
        ar: arabic,
    },
    react: {
        useSuspense: false,
    }
});

export default i18next;