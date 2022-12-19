import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeals } = useGlobalContext();
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText("");
    }
  };
  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeals();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              value={text}
              onChange={handleChange}
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={handleRandomMeal}
              style={{ width: "70%" }}
            >
              Suprise Me!
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};
export default Search;
