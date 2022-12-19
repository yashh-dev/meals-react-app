import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AllMeals = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMeals = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const fetchAllMeals = async (AllMeals) => {
    setLoading(true);
    console.log(AllMeals);
    const { data } = await axios.get(AllMeals).catch((err) => {
      console.log(err);
    });
    console.log(data);
    setLoading(false);
    if (data.meals) {
      setMeals(data.meals);
    } else {
      setMeals([]);
    }
  };
  const fetchRandomMeals = () => {
    fetchAllMeals(randomMeals);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    console.log(idMeal);
    let meal;
    meal = meals.find((meal) => meal.idMeal === idMeal);
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("close");
    setShowModal(false);
  };

  useEffect(() => {
    fetchAllMeals(`${AllMeals}${searchTerm}`);
  }, []);
  useEffect(() => {
    if (!searchTerm) {
      fetchAllMeals(`${AllMeals}${searchTerm}`);
    }
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeals,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
