import { useGlobalContext } from "../context";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();
  const { strMeal, idMeal, strMealThumb, strInstructions: text } = selectedMeal;
  console.log(selectedMeal);
  return (
    <aside className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="card col-8">
        <img
          src={strMealThumb}
          className="card-img-top"
          style={{ height: "50vh" }}
          alt="..."
        />
        <div className="card-body">
          <h1 className="card-title">{strMeal}</h1>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
        <div className="card-text">{text}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"></li>
        </ul>
        <div className="card-body">
          <button className="btn btn-outline-danger" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
