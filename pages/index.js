// @flow

// #region imports
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { firestoreConnect } from "react-redux-firebase";
import withReduxFirebase from "../HOC/withReduxFirebase";
import "firebase/firestore";
import firebase from "firebase";
import { Router } from "../config/routes";
import Layout from "../components/layout";

// #region flow types
type Props = {
  ...any
};

type State = {
  ...any
};
// #endregion

class Request extends PureComponent<Props, State> {
  static async getInitialProps({ context: { query, dispatch, ...props } }) {
    return {
      community_id: query.id
    };
  }

  // #region component lifecycle methods
  constructor(props) {
    super(props);
  }

  render() {
    const { community } = this.props;

    return (
      <Layout>
        <p>{community}</p>
        <button onClick={() => (Router.pushRoute("about", { community_id: community_id}))}>
      </Layout>
    );
  }
} 
export default compose(
  withReduxFirebase,
  firestoreConnect(({ community_id }) => {
    return [
      {
        collection: "communities",
        doc: community_id,
      }
    ];
  }),
  connect(({ firestore: { ordered, data }}) => ({
    community: ordered.community
  }))
)(Request);
