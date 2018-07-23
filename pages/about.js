// @flow

import React from "react";
import compose from "recompose/compose";
import withReduxFirebase from "../HOC/withReduxFirebase";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import Layout from "../components/layout";
import { Router } from "../config/routes";

type Props = {
  ...any
};
class Root extends React.Component<Props> {
  static async getInitialProps({ context: { query, dispatch, ...props } }) {
    return {
      community_id: query.id
    };
  }

  render() {
    const { community, members } = this.props;

    return (
      <div>
        <Layout>
          <p>{members}</p>
          <p>{community}</p>
          <button onClick={() => (Router.pushRoute("index", { community_id: community_id }))}>
        </Layout>
      </div>
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
        subcollections: [
          {
            collection: "members"
          }
        ],
        storeAs: "members"
      },
      {
        collection: "communities",
        doc: community_id,
      }

    ];
  }),
  connect(({ firestore: { ordered, data }) => ({
    community: ordered.community,
    members: ordered.members,
  }))
)(Root);
