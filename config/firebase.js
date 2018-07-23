const devConfig = {
  apiKey: "AIzaSyDKtR5xCw5XKsM3HLNqiUk6uqKMPjS31LM",
  authDomain: "test-88b50.firebaseapp.com",
  databaseURL: "https://test-88b50.firebaseio.com",
  projectId: "test-88b50",
  storageBucket: "test-88b50.appspot.com",
  messagingSenderId: "578747880775"
};

export const firebaseConfig =
  process.env.NODE_ENV === "production" ? devConfig : devConfig;
// devConfig;

// react-redux-firebase setting
export const RRFconfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  firebaseStateName: "firebase",
  enableRedirectHandling: false,
  oneListenerPerPath: true,
  logListenerError: true,
  // enableLogging:  true,
  setProfilePopulateResults: true,
  updateProfileOnLogin: true,
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  presence: "presence", // where list of online users is stored in database
  sessions: "sessions" // where list of user sessions is stored in database (presence must be enabled)
};
