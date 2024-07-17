import React from 'react'
import logoImg from '..assets/logo.jpg'
function Header() {
  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt="A restaurant" />
            <h1>Food ordering App</h1>
        </div>
        <nav>
            <button>Card (0)</button>
        </nav>
    </header>
  )
}

export default Header;
