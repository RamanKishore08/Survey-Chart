import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Bootstrap Meta Tags */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
