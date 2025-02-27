import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>GreenWatchAI - 企業環境監測平台</title>
        <meta name="description" content="追蹤企業環境績效和違規紀錄的平台" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp; 