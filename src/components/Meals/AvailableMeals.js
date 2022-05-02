import classes from "./AvailableMeals.module.css";
import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_LINK);
      if(!response.ok) {
        setIsLoading(false);
        setHttpError(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
  
      const list = [];
      
      for(const key in data) {
        list.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      };
      setMeals(list);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if(isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>;
      </section>
    );
  }
    
  if(httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>;
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
