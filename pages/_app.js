import React from "react";
import Head from "next/head";

// GLOBAL CSS
import "../styles/globals.css";

// CUSTOM CSS
import "../styles/main.css";
import "../styles/header.css";
import "../styles/home.css";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/overwrite-bs.css";

// BLUEPRINT
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="author" content="Satshree Shrestha" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          size="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          size="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          size="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
