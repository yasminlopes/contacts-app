export interface Contact {
  guid: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  photo?: string;
}

export interface ContactCreate {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  photo?: File | string | null;
}

export interface ContactUpdate {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
}

export interface ContactPhoto {
  photo?: string;
}