import ISO6391 from 'iso-639-1';

export const languages = ISO6391.getLanguages(ISO6391.getAllCodes());
export const languageName = (languageCode) =>
  languages.find(({ code }) => code === languageCode)?.name;
