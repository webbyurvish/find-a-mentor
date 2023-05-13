import ISO6391 from 'iso-639-1';
import countries from 'svg-country-flags/countries.json';
import { overwriteProfileDefaults } from '../utils/overwriteProfileDefaults';

function userHasRule(role, user) {
  return user?.roles?.includes(role);
}

export function isMentor(user) {
  return userHasRule('Mentor', user);
}

export function isAdmin(user) {
  return userHasRule('Admin', user);
}

export function fromVMtoM(user) {
  return {
    ...user,
    description: user.description,
    tags: user.tags.map((i) => i.value),
    spokenLanguages: user.spokenLanguages.map((i) => i.value),
    country: user.country.value,
  };
}

export function fromMtoVM(user) {
  return {
    ...user,
    ...(isMentor(user) ? {} : overwriteProfileDefaults(user)),
    country: user.country
      ? { label: countries[user.country], value: user.country }
      : { label: '', value: '' },
    spokenLanguages: user.spokenLanguages
      ? user.spokenLanguages.map((i) => ({
          label: ISO6391.getName(i),
          value: i,
        }))
      : [],
    tags: user.tags ? user.tags.map((i) => ({ label: i, value: i })) : [],
    title: user.title ?? '',
  };
}
