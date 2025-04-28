import { REGEX } from './regex';

export const phone = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e?.target?.value?.replace(REGEX?.onlyDigits, '');

  if (value?.length > 11) value = value?.slice(0, 11);

  value = value?.length <= 10
    ? value?.replace(REGEX.phoneShort, '($1) $2-$3')
    : value?.replace(REGEX.phoneLong, '($1) $2-$3');

  return value;
};

export const cpf = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e?.target?.value.replace(REGEX?.onlyDigits, '');

  if (value?.length > 11) value = value?.slice(0, 11);

  value = value
    ?.replace(REGEX?.cpfFirst, '$1.$2')
    ?.replace(REGEX?.cpfSecond, '$1.$2')
    ?.replace(REGEX?.cpfFinal, '$1-$2');

  return value;
};
