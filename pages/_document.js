// @flow

// #region imports
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import getContext from "~/src/app/styles/getContext";
import { ServerStyleSheet } from "styled-components";
// import registerServiceWorker from '~/src/app/services/registerServiceWorker';

// #endregion
// #region global vars or polyfill

if (process.browser) {
  // eslint-disable-next-line global-require
  require("smoothscroll-polyfill").polyfill();
  // force polyfill
  window.__forceSmoothScrollPolyfill__ = true;
}
// #endregion

// #region flow types
type Props = {
  ...any
};

type State = any;

type InitialProps = {
  req: any,
  res: any,
  pathname: string,
  query: any,
  asPath: string,
  isServer: boolean,
  store?: any,
  ...any
};
// #endregion

class RootDocument extends Document<Props, State> {
  // #region props initialization
  static async getInitialProps(initProps: InitialProps) {
    // Resolution order
    //
    // On the server:
    // 1. page.getInitialProps
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the server with error:
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. page.getInitialProps
    // 3. page.render

    // Get the context to collected side effects.
    const sheet = new ServerStyleSheet();
    const context = getContext();
    const page = initProps.renderPage(Component => props =>
      sheet.collectStyles(
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <Component {...props} />
        </JssProvider>
      )
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
      stylesContext: context,
      styles: (
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: context.sheetsRegistry.toString()
          }}
        />
      )
    };
  }
  // #endregion

  // #region component lifecycle methods
  componentDidMount() {
    // register service worker:
    // registerServiceWorker();
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>Next PWA Material UI Starter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta
            name="application-name"
            content="react-redux-nextjs-material-ui-pwa-starter"
          />
          <link rel="manifest" href="static/manifest.json" />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="static/favicon-16x16.png"
          />
          <meta name="theme-color" content="#1967be" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />

          <link
            rel="mask-icon"
            href="static/safari-pinned-tab.svg"
            color="#1967be"
          />
          <meta name="apple-mobile-web-app-title" content="Next PWA Starter" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-startup-image"
            href="static/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-title"
            content="react-redux-nextjs-material-ui-pwa-starter"
          />
          {/* <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <style>{`
            {/* next js fix for div surrounding #__next */}
            html,
            body,
            body > div:first-child,
            #__next,
            #__next > div:first-child  {
              height: 100%;
              margin: 0;
            }
          `}</style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
  // #endregion
}

export default RootDocument;
