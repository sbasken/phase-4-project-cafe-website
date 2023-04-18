import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="ui menu">
        <div className="header item">Component Cafe</div>
            <a className="item" href="/home">Home</a>
            <a className="item" href="/menu">Menu</a>
            <a className="item" href="/orders">Orders</a>
            <a className="item" href="/about">About</a>
        <div className="right menu">
            <a className="item">Login</a>
        </div>
    </div>
  )
}

export default Navbar