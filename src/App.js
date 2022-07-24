import './App.css';
import Game from './Game.js';
import Login from './Login.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#AFDEFF'
    }
  }
})

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
