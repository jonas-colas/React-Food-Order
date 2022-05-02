import classes from "./AvailableMeals.module.css";
import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch(process.env.REACT_APP_LINK);
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
  };

  useEffect(() => {
    fetchMeals();
  }, []);

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
