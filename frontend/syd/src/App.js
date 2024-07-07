import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
      </Routes>
    </Router>
}

export default App;
