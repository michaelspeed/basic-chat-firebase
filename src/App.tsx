import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Register from "./routes/Register";
import Chat from "./routes/chat";

const App: React.FC = () => {
  return (
    <div style={{height: '100%'}}>
      <BrowserRouter>
          <Route path={'/'} render={() => (<Register/>)} exact={true}/>
          <Route path={'/chat'} render={() => (<Chat/>)} exact={true}/>
      </BrowserRouter>
    </div>
  );
};

export default App;
