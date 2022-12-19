import { useContext } from "react";
import { AppContext, useGlobalContext } from "../context";

const Meals = () => {
  const { meals, loading, selectedMeal, selectMeal } = useGlobalContext();
  console.log("meals", meals);
  if (loading) {
    return (
      <section className="text-center">
        <h1>loading ...</h1>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <h1 className="text-center">
        No meal item based on you Search. Please try again
      </h1>
    );
  }

  return (
    <section className="row justify-content-center">
      {meals.map((meal) => {
        return (
          <div
            key={meal.idMeal}
            className="card mt-2 mx-1"
            style={{ width: "18rem" }}
          >
            <img src={meal.strMealThumb} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{meal.strMeal}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">category: {meal.strCategory}</li>
            </ul>
            <div className="card-body">
              <button
                onClick={() => selectMeal(meal.idMeal)}
                className="card-link btn btn-success"
              >
                more
              </button>
              <a href="#" className="card-link btn btn-danger">
                Favourite
              </a>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default Meals;
