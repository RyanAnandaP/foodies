import React from "react";
import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const requestConfig = {}
const Meals = () => {
  const {
    responseData: loadedMeals,
    error,
    loading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (loading) {
    return <p className="center">Fetching Meals....</p>;
  }

  if (error) {
    <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
