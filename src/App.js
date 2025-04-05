import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import StartPage from './components/StartPage/StartPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="App">{isAuthenticated ? <Home /> : <StartPage />}</div>
  );
}

export default App;
