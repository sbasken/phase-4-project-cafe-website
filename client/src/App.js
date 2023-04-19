import Home from './components/home';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Order from './components/Orders';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from'react';

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);

  // useEffect(() => {
  //   fetch("/check_session")
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json().then((currentUser) => setCurrentUser(currentUser));
  //       }
  //     });
  // }, []);
  
  return (
    <div >
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
