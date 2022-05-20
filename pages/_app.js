import PropTypes from "prop-types";

import "../sass/globals.scss";

function MyApp({ Component, pageProps }) {
  console.log({ Component, pageProps });
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
