import Home from './components/home';
import Navbar from './components/Navbar';
import MenuPage from './components/MenuPage';
import Order from './components/Orders';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import EditItem from './components/EditItem';
import Cart from './components/Cart';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from'react';

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ currentReceipt, setCurrentReceipt ] = useState(null);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((currentUser) => setCurrentUser(currentUser));
        }
      });
  }, []);
  
  return (
    <div >
      <div className="row">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="row">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<MenuPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/menu/:id" element={<EditItem />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart currentUser={currentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setCurrentReceipt={setCurrentReceipt}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
