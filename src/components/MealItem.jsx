import { currencyFormatter } from '../util/formatting'
import React, { useContext } from 'react'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
function MealItem({meal}) {
    const cartCtx = useContext(CartContext)
    function handleAddMeal() {
        cartCtx.addItem(meal);
    }

  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-action'>
                <Button onClick={handleAddMeal}>Add to Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem
