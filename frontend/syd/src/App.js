import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Table from './components/Table';
import Utilities from './components/Utilities'
import Analytics from './components/Analytics';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/home' element={<LandingPage />}></Route>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route exact path = '/Table' element={<Table />}></Route>
        <Route exact path = '/Analytics' element={<Analytics />}></Route>
        <Route exact path = '/Utilities' element={<Utilities />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
