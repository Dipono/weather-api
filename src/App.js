import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WheatherHome from './components/Wheather_Home/Wheather_Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<WheatherHome />} />
      </Routes>
    </Router>
  );
}
export default App;
