import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { BrowserRouter } from 'react-router-dom';
import Home from './Home'
import AddAmountPopup from './comps/win/gamePeriod/AddAmountPopup';

function App() {
  
  return (
    <div className='app'>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
