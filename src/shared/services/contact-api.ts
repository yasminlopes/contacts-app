import { API_ENDPOINS } from '../../core/routes/endpoints';
import { HttpClient } from '../../core/services/http-client';
import { ContactCreate } from '../types/contact';

export const createContact = (data: ContactCreate) => {
  return HttpClient.post<ApiResponse>(API_ENDPOINS.contacts.create, data);
};

export const deleteContact = (id: string) => {
  return HttpClient.delete(API_ENDPOINS.contacts.delete(id));
};

export const getContactPhoto = (guid: string) => {
  return HttpClient.get(API_ENDPOINS.contacts.viewPhoto(guid));
};
