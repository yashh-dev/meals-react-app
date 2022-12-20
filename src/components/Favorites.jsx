import { useGlobalContext } from "../context";

const Favorites = () => {
  const { removeFavorite, selectMeal, favorites } = useGlobalContext();

  return (
    <div className=" bg-dark d-flex justify-content-center">
      {favorites.map((meal) => {
        const { idMeal, strMealThumb } = meal;
        return (
          <div key={idMeal} className="mx-2 my-1 text-center">
            <img
              src={strMealThumb}
              className="rounded-circle "
              onClick={() => selectMeal(idMeal, true)}
              style={{ width: "5rem", height: "5rem", aspectRatio: 1 }}
            ></img>
            <a
              className="link-danger d-block c-pointer"
              onClick={() => removeFavorite(idMeal)}
              style={{ cursor: "pointer" }}
            >
              Remove
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default Favorites;
