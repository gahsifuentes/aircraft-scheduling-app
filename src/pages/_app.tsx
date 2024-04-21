// src/pages/_app.tsx
import { AppProps } from 'next/app';
import '../app/globals.css';
import AirlineProvider from '@/context/AirlineContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AirlineProvider>
      <Component {...pageProps} />
    </AirlineProvider>
  );
}

export default MyApp;
