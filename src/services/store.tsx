
import { IStore } from '@/stores';
import axios from 'axios';

export interface IGetStoreParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetStoreResponseBody {
  results: IStore[];
  total: number;
}

export interface IPostStoreResponseBody {
  status: string;
  data?: IStore;
  err?: unknown;
}

type IGetStoreRequest = (params: IGetStoreParams) => Promise<IGetStoreResponseBody>;
type IPostStoreRequest = (params: Partial<IStore>) => Promise<IPostStoreResponseBody>;

export const getStores: IGetStoreRequest = async ({ limit, page, search }) => {
  const { data } = await axios.get<IGetStoreResponseBody>(`/api/stores?limit=${limit}&page=${page}&search=${search}`);
  return data;
}

export const createStore: IPostStoreRequest = async (params) => {
  const { data } = await axios.post<IPostStoreResponseBody>(`/api/stores`, params);
  return data;
}