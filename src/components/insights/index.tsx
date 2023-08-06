import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface IStats {
  username: string;
}

type TiktokResponseData = {
  data: {
    social_network_name: string;
    username: string;
    tiktok_stats: IStats
  };
  message: any;
  status: string;
};
type InstagramResponseData = {
  data: {
    social_network_name: string;
    username: string;
    instagram_stats: IStats
  };
  message: any;
  status: string;
};
type FacebookResponseData = {
  data: {
    social_network_name: string;
    username: string;
    facebook_stats: IStats
  };
  message: any;
  status: string;
};

export function getCreatorSocialNetworkQueryKey(params: Params): unknown[] {
  return ['use-get-creator-social-network-profile', params];
}

interface IParamsInstagram {
  username: string;
  socialNetwork: 'instagram';
}

interface IParamsFacebook {
  username: string;
  socialNetwork: 'facebook';
}

interface IParamsTiktok {
  username: string;
  socialNetwork: 'tiktok';
}

type ResponseSocialNetwork = InstagramResponseData | TiktokResponseData | FacebookResponseData;

type SharedResponseSocialNetwork<T> = ResponseSocialNetwork & {
  data: {
    social_network_name: T;
  } & {
    [key in T extends 'facebook'
      ? 'facebook_stats'
      : T extends 'instagram'
      ? 'instagram_stats'
      : 'tiktok_stats']: IStats;
  };
}

type Params = IParamsInstagram | IParamsTiktok | IParamsFacebook;

export function useGetCreatorSocialNetworkProfile<T extends Params['socialNetwork']>(
  params: Params,
  options: UseQueryOptions<AxiosResponse<SharedResponseSocialNetwork<T>>, AxiosError, SharedResponseSocialNetwork<T>, unknown[]> = {},
) {
  return useQuery({
    queryKey: getCreatorSocialNetworkQueryKey(params),
    queryFn: async () => {
      return axios.get<SharedResponseSocialNetwork<T>>(`/${params.socialNetwork}/${params.username}`);
    },
    ...options,
  });
}

export function InsightsInstagram() {
  const instagramQuery = useGetCreatorSocialNetworkProfile<'instagram'>({
    socialNetwork: 'instagram',
    username: 'lorem',
  });
  return <div>{JSON.stringify(instagramQuery.data?.data.instagram_stats)}</div>;
}
export function InsightsTiktok() {
  const tiktokQuery = useGetCreatorSocialNetworkProfile<'tiktok'>({
    socialNetwork: 'tiktok',
    username: 'lorem',
  });
  return <div>{JSON.stringify(tiktokQuery.data?.data.tiktok_stats)}</div>;
}
export function InsightsFacebook() {
  const facebookQuery = useGetCreatorSocialNetworkProfile<'facebook'>({
    socialNetwork: 'facebook',
    username: 'lorem',
  });
  return <div>{JSON.stringify(facebookQuery.data?.data.facebook_stats)}</div>;
}
