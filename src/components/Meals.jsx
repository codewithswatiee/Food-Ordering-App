import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MealItem from './MealItem';

function Meals() {

    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response =  await fetch('http://localhost:3000/meals');
           if(!response.ok){
            //something
           }
    
           const meals = await response.json();
           setLoadedMeals(meals)
        }
        fetchMeals();
        console.log("meals")
    }
    , []);
    
    
  return (
    <ul id='meals'>
        {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal}/>)}
    </ul>
  )
}

export default Meals
