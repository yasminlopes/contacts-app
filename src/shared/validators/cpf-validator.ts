import { cpf } from 'cpf-cnpj-validator';
import { removeSpecialCharacters } from '../utils/chars';

export function isValidCpf(documentNumber: string): boolean {
  const documentWithNoDigits = removeSpecialCharacters(documentNumber);

  if (documentWithNoDigits?.length !== 11) return false;

  return cpf.isValid(documentWithNoDigits);
}
