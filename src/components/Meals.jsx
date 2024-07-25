import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Meals() {

    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response =  fetch('http://localhost:3000/meals');
            console.log("mealssss")
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
        {loadedMeals.map((meal) => <li key={meal.id}>{meal.name}</li>)}
    </ul>
  )
}

export default Meals
