// @flow

// #region imports
import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Router } from "~/src/app/config/routes";
import { withFirebase } from "react-redux-firebase";
import "firebase/firestore"; // <- needed if using firestore
import { firestoreConnect } from "react-redux-firebase";
import firebase from "firebase";
import { reduxFirestore } from "redux-firestore";
import "firebase/firestore";
import { spinnerWhile } from "~/src/app/utils/spinnerWhileLoading";

// #region flow types
type Props = {
  children: ReactNode,
  // withStyle injected
  classes: any,
  theme: any,
  firebase: any,
  isNotLogedIn: any
};

type State = {
  mobileOpen: boolean,
  anchorEl: any
};
// #endregion

class Layout extends React.Component<Props, State> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

// #region redux state and dispatch map to props
export default compose(firestoreConnect())(Layout);
