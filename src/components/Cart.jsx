import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

function Cart() {
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);
    const userProgeressCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgeressCtx.hideCart();
    }

    function handleShowCheckout(){
        userProgeressCtx.showCheckout();
    }

  return (
    <Modal className='cart' onClose={userProgeressCtx.progress === 'cart' ? handleCloseCart : null} open={userProgeressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => 
                <CartItem 
                    key={item.id} 
                    item={item} 
                    onIncrease={() => cartCtx.addItem(item)} 
                    onDecrease={() => cartCtx.removeItem(item.id)}>
                </CartItem>)}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}> Close </Button>
            {cartCtx.items.length > 0 &&  <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
        </p>
    </Modal>
  )
}

export default Cart
