import React from 'react'

const Navbar = ({currentUser, handleLogout}) => {
  return (
    <div className="ui menu">
        <div className="header item">Component Cafe</div>
            <a className="item" href="/home">Home</a>
            <a className="item" href="/menu">Menu</a>
            <a className="item" href="/orders">Orders</a>
            <a className="item" href="/about">About</a>
        <div className="right menu">
        {currentUser ? 
            <>
            <a className='item' href='/logout' onClick={handleLogout}> Logout </a>
            <a className='item' href='/cart'> 🛒 </a> </>
            : null}
            <a className="item" href="/login">{currentUser? `Welcome, ${currentUser.username}`:"Login"}</a>
        </div>
    </div>
  )
}

export default Navbar