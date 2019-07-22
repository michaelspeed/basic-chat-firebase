import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Register from "./routes/Register";

const App: React.FC = () => {
  return (
    <div style={{height: '100%'}}>
      <BrowserRouter>
          <Route path={'/'} render={() => (<Register/>)}/>

      </BrowserRouter>
    </div>
  );
};

export default App;
