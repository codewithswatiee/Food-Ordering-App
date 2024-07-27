import React from 'react'
import MealItem from './MealItem';
import useHttp from '../Hooks/useHttp';
import Error from './Error';


const requestConfig = {}
function Meals() {

  const {data: loadedMeals, isloading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);

  console.log(loadedMeals)
  
  if(isloading){
    return <p className='center'>Loading meals for you...</p>
  }

  if(error){
    return <Error title='Failed to Fetch meals' message={error}/>
  }
  return (
    <ul id='meals'>
        {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal}/>)}
    </ul>
  )
}

export default Meals
