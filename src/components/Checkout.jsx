import React, { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../Hooks/useHttp';


const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}
function Checkout() {
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const userProgeressCtx = useContext(UserProgressContext);

    const {data, isloading: isSending, error, sendRequest, clearData} =  useHttp('http://localhost:3000/orders', requestConfig)

    function handleClose() {
        userProgeressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgeressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                }
            })
        );
    }

    let actions = (<>
        <Button textOnly type='button' onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </>);

    if(isSending){
        actions = <span>Sending order data</span>
    }
    if(data && !error){
        return <Modal open={userProgeressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Sucess!</h2>
            <p> Your order was submitted sucessfully</p>
            <p>
                We will get back to you with more details via email within the next few minutes
            </p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }
  return (
    <Modal open={userProgeressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>
                CheckOut
            </h2>
            <p>Total Amount : {currencyFormatter.format(cartTotal)} </p>

            <Input label='Full-Name' type='text' id='name'></Input>
            <Input label='E-mail Address' type='email' id='email'/>
            <Input label='Phone Number' type='tel' id='phone-number'/>
            <Input label='Street Address' type='text' id='street'/>
            <div className='control-row'>
                <Input label='Postal Code' type='text' id='postal-code'></Input>
                <Input label='City' type='text' id='city'/>
            </div>

            {error && <Error title="failed to Submit" message={error}></Error>}
            <p className='modal-acitons'>
                {actions}
            </p>
        </form>
    </Modal>
  )
}

export default Checkout
