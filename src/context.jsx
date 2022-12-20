import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AllMeals = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMeals = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem("favorites");
    if (favorites) {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } else {
      favorites = [];
    }
    return favorites;
  };
  const setLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

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
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("close");
    setShowModal(false);
  };

  const addFavorite = (idMeal) => {
    console.log(favorites);
    const isAlreadyFav = favorites.find((meal) => meal.idMeal === idMeal);
    if (isAlreadyFav) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    console.log(meal);
    const updatedFavs = [...favorites, meal];
    setFavorites(updatedFavs);
    setLocalStorage("favorites", updatedFavs);
  };

  const removeFavorite = (idMeal) => {
    const updatedFavs = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavs);
    setLocalStorage("favorites", updatedFavs);
  };

  useEffect(() => {
    fetchAllMeals(`${AllMeals}`);
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
        addFavorite,
        removeFavorite,
        favorites,
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
