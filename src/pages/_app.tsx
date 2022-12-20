import Providers from '@/components/Providers';
import Globals from '@/styles/globals';
import type { AppProps } from 'next/app';
import 'swiper/css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Globals />
      <Component {...pageProps} />
    </Providers>
  );
}
