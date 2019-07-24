import firebase from 'firebase/app'
import  'firebase/auth'
import  'firebase/database'
import 'firebase/firestore'
import {combineReducers, compose, createStore} from "redux";
import {firebaseReducer, reactReduxFirebase} from "react-redux-firebase";
import {createFirestoreInstance, firestoreReducer, reduxFirestore} from "redux-firestore";
import {composeWithDevTools} from "redux-devtools-extension";

const firebaseConfig = {
    apiKey: "AIzaSyAFNt6V-TQjfnx0FGYhK6zvwiWvWUFnYhM",
    authDomain: "atfly-295c9.firebaseapp.com",
    databaseURL: "https://atfly-295c9.firebaseio.com",
    projectId: "atfly-295c9",
    storageBucket: "atfly-295c9.appspot.com",
    messagingSenderId: "316931128379",
    appId: "1:316931128379:web:db9b0433c2ca8554"
};

const rrconfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools());

export const rrfProps = {
    firebase,
    config: rrconfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

export default store;
