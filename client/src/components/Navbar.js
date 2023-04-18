import React from 'react'

const Navbar = () => {
  return (
    <div className="ui menu">
        <div className="header item">Component Cafe</div>
            <a className="item" href="/home">Home</a>
            <a className="item" href="/menu">Menu</a>
            <a className="item" href="/orders">Orders</a>
            <a className="item" href="/about">About</a>
        <div className="right menu">
        <button class="ui vertical animated button">
            <div class="hidden content">Shop</div>
            <div class="visible content">
                <i aria-hidden="true" class="shop icon"></i>
            </div>
        </button>
            <a className="item">Login</a>
        </div>
    </div>
  )
}

export default Navbar