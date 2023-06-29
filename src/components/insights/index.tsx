import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type TiktokResponseData = {
  data: {
    social_network_name: string;
    username: string;
    tiktok_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};
type InstagramResponseData = {
  data: {
    social_network_name: string;
    username: string;
    instagram_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};
type FacebookResponseData = {
  data: {
    social_network_name: string;
    username: string;
    facebook_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};

export function getCreatorSocialNetworkQueryKey(params: Params): unknown[] {
  return ['use-get-creator-social-network-profile', params];
}

interface ParamsInstagram {
  username: string;
  socialNetwork: 'instagram';
}

interface ParamsFacebook {
  username: string;
  socialNetwork: 'facebook';
}

interface ParamsTiktok {
  username: string;
  socialNetwork: 'tiktok';
}

type ResponseSocialNetwork = InstagramResponseData | TiktokResponseData | FacebookResponseData;

type Params = ParamsInstagram | ParamsTiktok | ParamsFacebook;

export function useGetCreatorSocialNetworkProfile(
  params: Params,
  options: UseQueryOptions<AxiosResponse<ResponseSocialNetwork>, AxiosError, ResponseSocialNetwork, unknown[]> = {},
) {
  return useQuery({
    queryKey: getCreatorSocialNetworkQueryKey(params),
    queryFn: async () => {
      return axios.get<ResponseSocialNetwork>(`/${params.socialNetwork}/${params.username}`);
    },
    ...options,
  });
}

export function InsightsInstagram() {
  const instagramQuery = useGetCreatorSocialNetworkProfile({
    socialNetwork: 'instagram',
    username: 'lorem',
  });
  return <div>{JSON.stringify(instagramQuery.data?.data.instagram_stats)}</div>;
}
export function InsightsTiktok() {
  const tiktokQuery = useGetCreatorSocialNetworkProfile({
    socialNetwork: 'tiktok',
    username: 'lorem',
  });
  return <div>{JSON.stringify(tiktokQuery.data?.data.tiktok_stats)}</div>;
}
export function InsightsFacebook() {
  const facebookQuery = useGetCreatorSocialNetworkProfile({
    socialNetwork: 'facebook',
    username: 'lorem',
  });
  return <div>{JSON.stringify(facebookQuery.data?.data.facebook_stats)}</div>;
}
