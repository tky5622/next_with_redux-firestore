// @flow

import React, { Component } from "react";
import configureStore from "../redux/store";
import { Provider } from "react-redux";

type Props = {
  ...any
};

function withReduxFirebase(WrappedComponent) {
  return class EnhancedComponent extends Component<Props> {
    static displayName = `withRedux(${WrappedComponent.displayName ||
      WrappedComponent.name}`;
    static async getInitialProps(context) {
      const { req } = context;
      const isServer = !!req && typeof window === "undefined";
      const store = configureStore({}, { req: "" });

      // client set cookies
      let cookies = (req && req.headers && req.headers.cookie) || {};
      if (typeof cookies === "string") {
        const cookie = require("cookie");
        cookies = cookie.parse(cookies);
      }

      // pass init props to getInitProps wrapped component for ssr ops
      let wrappedInitialProps = {};
      if (WrappedComponent.getInitialProps) {
        const contextNew = {
          ...context,
          dispatch: store.dispatch,
          getState: store.getState,
          initialState: store.initialState,
          initStoreReducer: reducer,
          isServer: store.isServer,
          store: store
        };
        wrappedInitialProps = await WrappedComponent.getInitialProps(
          contextNew
        );
      }

      // Check for localStorge store cache and pass to cache populate
      const localStorageStore =
        process.browser && localStorage && localStorage.store
          ? JSON.parse(localStorage.store)
          : {};

      // →
      return {
        ...wrappedInitialProps,
        cookies,
        initialState: store.getState(),
        isServer,
        localStorageStore
      };
    }

    constructor(props) {
      super(props);
      this.store = configureStore((props.initialState: any), { req: "" });
    }

    render() {
      return (
        <Provider store={this.store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
}
export default withReduxFirebase;
