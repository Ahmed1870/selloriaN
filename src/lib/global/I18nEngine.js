export const getGlobalConfig = (countryCode) => {
  const configs = {
    'EG': { currency: 'ج.م', lang: 'ar-EG', greeting: 'يا باشا مصر نورت سيلوريا! 🇪🇬' },
    'SA': { currency: 'ر.س', lang: 'ar-SA', greeting: 'يا هلا والله بأهل المملكة في سيلوريا! 🇸🇦' },
    'AE': { currency: 'د.إ', lang: 'ar-AE', greeting: 'حياك الله في سيلوريا الإمارات! 🇦🇪' },
    'US': { currency: '$', lang: 'en-US', greeting: 'Welcome to Selloria Global! 🌎' }
  };
  return configs[countryCode] || configs['EG'];
};
