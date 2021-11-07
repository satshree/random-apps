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
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
