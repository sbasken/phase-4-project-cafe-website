import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({currentUser, handleLogout}) => {
  return (
    <div className="ui menu">
        <div className="header item">Binary Beans Cafe</div>
            <Link className="item" to="/home">Home</Link>
            <Link className="item" to="/menu">Menu</Link>
            <Link className="item" to="/about">About</Link>
        <div className="right menu">
        {currentUser ? 
            <>
            <Link className="item" to="/orders">Orders</Link>
            <Link className='item' to='/home' onClick={handleLogout}> Logout </Link>
            <Link className='item' to='/cart'> 🛒 </Link> </>
            : null}
            <Link className="item" to="/login">{currentUser? `Welcome, ${currentUser.username}`:"Login"}</Link>
        </div>
    </div>
  )
}

export default Navbar