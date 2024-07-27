import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
function Header() {

  const userProgeressCtx = useContext(UserProgressContext);


  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart(){
    userProgeressCtx.showCart();
  }
  
  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt="A restaurant" />
            <h1>Food ordering App</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}> Cart ({totalCartItems}) </Button>
        </nav>
    </header>
  )
}

export default Header;
