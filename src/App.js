import './App.css';
import Game from './Game.js';
import Login from './Login.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/game' element={<Game/>}/>
      </Routes>
    </Router>
  );
}

export default App;
