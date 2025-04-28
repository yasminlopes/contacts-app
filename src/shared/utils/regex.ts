export const REGEX = {
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  phone: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  onlyDigits: /\D/g,
  phoneShort: /(\d{2})(\d{4})(\d*)/,
  phoneLong: /(\d{2})(\d{5})(\d*)/,
  cpfFirst: /(\d{3})(\d)/,
  cpfSecond: /(\d{3})(\d)/,
  cpfFinal: /(\d{3})(\d{1,2})$/,
};
