import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Table from './components/Table';
import Charts from './components/Charts'
import Utilities from './components/Utilities'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/home' element={<LandingPage />}></Route>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route exact path = '/Table' element={<Table />}></Route>
        <Route exact path = '/Charts' element={<Charts />}></Route>
        <Route exact path = '/Utilities' element={<Utilities />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
