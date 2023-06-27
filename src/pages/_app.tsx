import type { AppProps } from 'next/app';
import { DM_Sans } from '@next/font/google';
import '@/styles/globals.css';
import '@/styles/Home.css';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicAmplifyConfig>
      <main className={`${(DM_SANS.className, 'main bg-gray-50')}`}>
        <Component {...pageProps} />
      </main>
    </DynamicAmplifyConfig>
  );
}
