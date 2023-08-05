import type { AppProps } from 'next/app';
import { DM_Sans } from '@next/font/google';
import '@/styles/globals.css';
import '@/styles/Home.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/auth/withAuth';
import { excludedRoutes } from '@/constants/excludedRoutes';
import { AuthProvider } from '@/utils/auth/AuthContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const DynamicAmplifyConfig = dynamic(
  () => import('@/components/lazy-amplify-configure').then((el) => el.LazyAmplifyConfigure),
  {
    ssr: false,
  },
);

const DM_SANS = DM_Sans({
  weight: ['400', '500', '700'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  preload: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const AuthenticatedComponent = withAuth(Component, { excludedRoutes });
  return (
    <DynamicAmplifyConfig>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <main className={`${(DM_SANS.className, 'main bg-gray-50')}`}>
            <AuthenticatedComponent {...pageProps} />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </main>
        </QueryClientProvider>
      </AuthProvider>
    </DynamicAmplifyConfig>
  );
}
