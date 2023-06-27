import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Autenticación - BlindCreators" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
