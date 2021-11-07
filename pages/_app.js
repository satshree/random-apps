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
    <div>
      <Head>
        <meta name="author" content="Satshree Shrestha" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
