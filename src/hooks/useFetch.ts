/* eslint-disable @typescript-eslint/no-empty-function */
import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(
  url: string,
  setLoading: (state: boolean) => void = () => {},
) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    setLoading(true);
    const response = await api.get(url);
    setLoading(false);
    return response.data;
  });

  return { data, error, mutate };
}
