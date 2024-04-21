
import { AirlineProvider } from '@/context/AirlineContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AirlineProvider>
      <Component {...pageProps} />
    </AirlineProvider>
  );
}

export default MyApp;