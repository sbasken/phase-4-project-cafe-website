import Home from './components/home';
import Navbar from './components/Navbar';
import MenuPage from './components/MenuPage';
import Order from './components/Orders';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import EditItem from './components/EditItem';
import Cart from './components/Cart';
import NewItem from './components/NewItem';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from'react';
import {useNavigate} from 'react-router-dom'


function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ currentReceipt, setCurrentReceipt ] = useState(null);
  const [ menuItems, setMenuItems ] = useState([])
  const [ category, setCategory ] = useState('all')
  const [ filteredItems, setFilteredItems ] = useState([])
  const navigate = useNavigate();
  console.log(currentReceipt, "in app")

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((currentUser) => setCurrentUser(currentUser)
          )}
      });
  }, []);

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
      .then((r) => {
        if (r.ok) {
          setCurrentUser(null)
        }
        navigate('/home')
      })
    }
  
  useEffect(() => {
    fetch("/menu")
    .then(res => res.json())
    .then(data => {
      setMenuItems(data)
      setFilteredItems(data)
    });
  }, [])

  useEffect(() => {
    const filtered = menuItems.filter(item => {
      if (category === 'all') {
        return true;
      } else {
        return item.category === category;
      }
    });
    setFilteredItems(filtered);
  }, [menuItems, category]);

  const deleteItem = (id) => {
    console.log(id)
    const updatedItems = menuItems.filter(item => item.id !== id)
    setMenuItems(updatedItems)
  }

  const onAddItem = (newItem) => {
    const updatedItems = [...menuItems, newItem]
    setMenuItems(updatedItems)
  }

  const updateItem = (updatedItem) => {
    const newItems = menuItems.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setMenuItems(newItems)
  }

  const handleFilter = (value) => {
    setCategory(value)
  }
  
  return (
    <div >
      <div className="row">
        <Navbar currentUser={currentUser} handleLogout={handleLogout}/>
      </div>
      <div className="row">
        <Routes>
          <Route path="/home" element={<Home currentReceipt={currentReceipt}/>} />
          <Route path="/menu/:id" element={<EditItem handleUpdateItem={updateItem}/>} />
          <Route path="/menu" element={<MenuPage 
                                          currentUser={currentUser} 
                                          currentReceipt={currentReceipt}
                                          handleFilter={handleFilter}
                                          filteredItems={filteredItems}
                                          deleteItem={deleteItem}
                                          />} />
          <Route path="/orders" element={<Order currentUser={currentUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/newitem" element={<NewItem onAddItem={onAddItem}/>} />
          <Route path="/cart" element={<Cart 
          currentUser={currentUser} 
          currentReceipt={currentReceipt}/>} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setCurrentReceipt={setCurrentReceipt}/>} />
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setCurrentReceipt={setCurrentReceipt}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
