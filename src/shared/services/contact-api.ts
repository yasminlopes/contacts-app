import { API_ENDPOINS } from '../../core/routes/endpoints';
import { HttpClient } from '../../core/services/http-client';
import { ContactCreate, ContactUpdate } from '../types/contact';

export const createContact = (data: ContactCreate) => {
  return HttpClient.post<ApiResponse>(API_ENDPOINS.contacts.create, data);
};

export const deleteContact = (id: string) => {
  return HttpClient.delete(API_ENDPOINS.contacts.delete(id));
};

export const getContactPhoto = (guid: string) => {
  return HttpClient.get(API_ENDPOINS.contacts.viewPhoto(guid));
};

export const updateContact = (id: string, data: ContactUpdate) => {
  return HttpClient.patch(API_ENDPOINS.contacts.update(id), data);
}

export const updatePhoto = (id: string, data: unknown) => {
  return HttpClient.patch(API_ENDPOINS.contacts.updatePhoto(id), data);
}

export const deletePhoto = (id: string) => {
  return HttpClient.delete(API_ENDPOINS.contacts.deletePhoto(id));
}