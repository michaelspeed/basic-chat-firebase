import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Register from "./routes/Register";
import Chat from "./routes/chat";
import { Provider } from 'react-redux'
import store, {rrfProps} from "./store/store";
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <div style={{height: '100%'}}>
                <BrowserRouter>
                    <Route path={'/'} render={() => (<Register/>)} exact={true}/>
                    <Route path={'/chat'} render={() => (<Chat/>)} exact={true}/>
                </BrowserRouter>
            </div>
        </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
