import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getCreatedDogs } from "../actions";

export default function CreatedDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperament = useSelector((state) => state.temperaments);
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCreatedDogs(input));
    alert("¡Dog successfully created!");
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    navigate("/home");
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>Go back</button>
      </Link>
      <h1>Create your dog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Name -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="name"
              value={input.name}
            />
          </label>
        </div>
        <div>
          <label>
            Minimun Height -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="heightMin"
              value={input.heightMin}
            />
          </label>
        </div>
        <div>
          <label>
            Maximun Height -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="heightMax"
              value={input.heightMax}
            />
          </label>
        </div>
        <div>
          <label>
            Minimun Weight -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="weightMin"
              value={input.weightMin}
            />
          </label>
        </div>
        <div>
          <label>
            Maximun Weight -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="weightMax"
              value={input.weightMax}
            />
          </label>
        </div>
        <div>
          <label>
            Life Span -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="life_span"
              value={input.life_span}
            />
          </label>
        </div>
        <div>
          <label>
            Image -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="image"
              value={input.image}
            />
          </label>
        </div>
        <div>
          <label>
            Temperament -
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="temperament"
              value={input.temperament}
            />
          </label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {temperament.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {/* <ul>
          <li>{input.temperament.map((el) => el + ", ")}</li>
        </ul> */}
        <button type="submit">Create a dog</button>
      </form>
    </div>
  );
}
