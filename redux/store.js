import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { firebaseConfig, RRFconfig } from "../config/firebase";
import firebase from "firebase";
import { reduxFirestore } from "redux-firestore";
import "firebase/firestore";
import "firebase/functions"; // <- needed if using httpsCallable
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const firebaseApp = () => {
  // check if firebase instance exsits
  return !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
};

// #region configure logger middleware
const loggerMiddleware = createLogger({
  level: "info",
  collapsed: true
});

const makeConfiguredStore = (someReducer: any, initialState: any) =>
  createStore(
    someReducer,
    initialState,
    composeWithDevTools(
      reactReduxFirebase(firebaseApp(), RRFconfig),
      reduxFirestore(firebaseApp()),
      applyMiddleware(loggerMiddleware, thunk.withExtraArgument(getFirebase))
    )
  );

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// #region store initialization
export default function configureStore(
  initialState,
  { isServer, req, debug, storeKey } // { isServer },
) {
  if (isServer) {
    const serverInitialState =
      initialState ||
      {
        // serverState: { fromServer: "foo" }
      };
    firebaseApp();
    return makeConfiguredStore(rootReducer, serverInitialState);
  } else {
    // firebase.initialzeApp(firebaseConfig);
    firebaseApp();
    const settings = { timestampsInSnapshots: true };
    firebase.firestore().settings(settings);
    firebase.functions(); // <- needed if using httpsCallable
    const store = makeConfiguredStore(rootReducer, initialState);
    store.firebaseAuthIsReady.then(() => {
      console.log("Auth has loaded", { isServer, req, debug, storeKey }); // eslint-disable-line no-console
    });

    return store;
  }
}
