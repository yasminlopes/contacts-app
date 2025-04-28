import { REGEX } from './regex';

export function removeSpecialCharacters(text: string) {
  if (!text) return null;

  return text.replace(REGEX.onlyDigits, '');
}

export function removeSpecialCharactersFromProperties(properties: string[]) {
  return properties.map((property) => removeSpecialCharacters(property));
}
