import React from 'react'

const Navbar = () => {
  return (
    <div className="ui menu">
          <div className="header item">Component Cafe</div>
           <a className="item">Home</a>
            <a className="item">Menu</a>
            <a className="item">Orders</a>
            <a className="item">About</a>
        <div className="right menu">
            <a className="item">Login</a>
        </div>
        </div>
  )
}

export default Navbar