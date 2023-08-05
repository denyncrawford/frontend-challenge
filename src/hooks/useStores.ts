import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createStore,
  getStores,
  IPostStoreResponseBody,
} from "@/services/store";
import { AxiosError } from "axios";
import { atom, useAtom } from "jotai";
import { IStore } from "@/stores";

interface IPagination {
  page: number;
  limit: number;
  search: string;
}

export interface IZodMappedError {
  path: string;
  message: string;
}
export interface IResponseError {
  status: string;
  error: IZodMappedError[];
}

export const paginationAtom = atom<IPagination>({
  page: 1,
  limit: 10,
  search: "",
});

export const useStoresPagination = () => {
  const pagination = useAtom(paginationAtom);
  return pagination;
};

export const useStores = (pagination: IPagination) => {
  return useQuery(
    ["stores", {
      page: pagination.page,
      limit: pagination.limit,
      search: pagination.search,
    }],
    () => getStores(pagination),
    {
      keepPreviousData: false,
      cacheTime: 0,
    },
  );
};

export const useCreateStore = () => {
  return useMutation<IPostStoreResponseBody, AxiosError<IResponseError>, Partial<IStore>>((
    store: Partial<IStore>,
  ) => createStore(store));
};
