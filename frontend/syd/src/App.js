import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
