import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

addLocaleData([...en, ...fr]);

export const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export const getAvailableLocale = (appLocale) => {
  let locale = appLocale || 'auto';

  if (typeof navigator !== 'undefined' && appLocale === 'auto') {
    locale =
      navigator.userLanguage ||
      navigator.language ||
      (navigator.languages && navigator.languages[0] ? navigator.languages[0] : 'en');
  }

  if (translations[locale.slice(0, 2)]) {
    return locale.slice(0, 2);
  }

  return 'en';
};

const getTranslations = appLocale => translations[getAvailableLocale(appLocale)];

export default getTranslations;
