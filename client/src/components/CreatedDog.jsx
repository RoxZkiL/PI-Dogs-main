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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.life_span &&
      input.image &&
      input.temperament
    ) {
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
    } else {
      alert("All information about the new dog must be completed");
    }
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
            {errors.name && <p>{errors.name}</p>}
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
            {errors.heightMin && <p>{errors.heightMin}</p>}
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
            {errors.heightMax && <p>{errors.heightMax}</p>}
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
            {errors.weightMin && <p>{errors.weightMin}</p>}
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
            {errors.weightMax && <p>{errors.weightMax}</p>}
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
            {errors.life_span && <p>{errors.life_span}</p>}
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
            {errors.image && <p>{errors.image}</p>}
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
              disabled
            />
            {errors.temperament && <p>{errors.temperament}</p>}
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

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
    // } else if (!/\S+@\S+\.\S+/.test(input.name)) {
    //   errors.name = "Name is invalid";
  }

  if (!input.heightMin) {
    errors.heightMin = "Minimun height is required";
    // } else if (!/(?=.*[0-9])/.test(input.heightMin)) {
    //   errors.heightMin = "Minimun height is invalid (should be a number)";
  }

  if (!input.heightMax) {
    errors.heightMax = "Maximun height is required";
    // } else if (!/(?=.*[0-9])/.test(input.heightMax)) {
    //   errors.heightMax = "Maximun height is invalid (should be a number)";
  }

  if (!input.weightMin) {
    errors.weightMin = "Minimun weight is required";
    // } else if (!/(?=.*[0-9])/.test(input.weightMin)) {
    //   errors.weightMin = "Minimun weight is invalid (should be a number)";
  }

  if (!input.weightMax) {
    errors.weightMax = "Maximun weight is required";
    // } else if (!/(?=.*[0-9])/.test(input.weightMax)) {
    //   errors.weightMax = "Maximun weight is invalid (should be a number)";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
    // } else if (!/(?=.*[0-9])/.test(input.life_span)) {
    //   errors.life_span = "Life span  is invalid";
  }

  if (!input.image) {
    errors.image = "Image url is required";
    // } else if (!/(?=.*[0-9])/.test(input.image)) {
    //   errors.image = "Image url is invalid";
  }

  if (!input.temperament) {
    errors.temperament = "Temperemnts are required";
    // } else if (!/(?=.*[0-9])/.test(input.temperament)) {
    //   errors.temperament = "Temperemnts are invalid";
  }

  return errors;
}
