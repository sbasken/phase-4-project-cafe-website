import Home from './components/home';
import Navbar from '../components/navbar';
import Menu from '../components/menu';
import Order from '../components/order';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div >
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home" element={<Menu />} />
          <Route exact path="/home" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
