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
      !isNaN(input.heightMin) &&
      !isNaN(input.heightMax) &&
      !isNaN(input.weightMin) &&
      !isNaN(input.weightMax) &&
      input.life_span.includes("years") &&
      input.image.includes("http") &&
      input.temperament.length !== 0
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
      alert(
        "All information about the new dog must be completed and must be valid"
      );
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
        <button type="submit">Create a dog</button>
      </form>
    </div>
  );
}

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }

  if (!input.heightMin) {
    errors.heightMin = "Minimun height is required";
  } else if (!/^([0-9])*$/.test(input.heightMin)) {
    errors.heightMin = "Minimun height should be a number";
  }

  if (!input.heightMax) {
    errors.heightMax = "Maximun height is required";
  } else if (!/^([0-9])*$/.test(input.heightMax)) {
    errors.heightMax = "Maximun height should be a number";
  }

  if (!input.weightMin) {
    errors.weightMin = "Minimun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMin)) {
    errors.weightMin = "Minimun weight should be a number";
  }

  if (!input.weightMax) {
    errors.weightMax = "Maximun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMax)) {
    errors.weightMax = "Maximun weight should be a number";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (!input.life_span.includes("years")) {
    errors.life_span = "The age of the dog must include the word (years)";
  }

  if (!input.image) {
    errors.image = "Image url is required";
  } else if (!input.image.includes("http")) {
    errors.image = "The image should have a valid url";
  }

  if (!input.temperament) {
    errors.temperament = "Temperemnts are required";
  }
  return errors;
}
