import useSWR from 'swr';
import { useMemo } from 'react';
import { API_ENDPOINS } from '../../core/routes/endpoints';
import { HttpClient } from '../../core/services/http-client';
import { Contact } from '../types/contact';

interface Params {
  page?: number;
  term?: string;
  letter?: string;
}

interface ContactsResponse {
  data: Contact[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export function useGetAllContacts(params: Params = {}) {
  const query = new URLSearchParams();

  if (params.page) query.append('page', params.page.toString());
  if (params.term) query.append('term', params.term);
  if (params.letter) query.append('letter', params.letter);

  const endpoint = `${API_ENDPOINS.contacts.list}?${query.toString()}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<ContactsResponse>(endpoint, HttpClient.fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  });

  return useMemo(() => ({
    data: data?.data,
    meta: data?.meta,
    loading: isLoading,
    error,
    isValidating,
    mutate,
  }), [data, isLoading, error, isValidating, mutate]);
}