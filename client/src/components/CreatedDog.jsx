import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getCreatedDogs } from "../actions";
import style from "./CreatedDog.module.css";

export default function CreatedDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  var [input, setInput] = useState({
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
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length === 0 && input.temperament.length !== 0) {
      dispatch(getCreatedDogs(input));
      alert("¡Dog successfully created!");
      navigate("/home");
    } else {
      alert(
        "All information about the new dog must be completed and valid, also you have to select a temperament"
      );
    }
  }

  function handleSelect(e) {
    if (input.temperament.length < 4) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
      let temps = input.temperament;
      let findTemp = temps.indexOf(e.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(e.target.value);
      }
      setInput({
        ...input,
        temperament: temps,
      });
    } else {
      alert("You can only select 4 temperaments");
    }
  }

  function handleDeleteTemperaments(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  }

  return (
    <div>
      <h1 className={style.h1}>CREATE YOUR OWN DOG</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={style.text}>
            Dog Name -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="name"
              value={input.name}
              required
            />
            {errors.name && <p className={style.validation}>{errors.name}</p>}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Minimun Height -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="heightMin"
              value={input.heightMin}
              required
            />
            {errors.heightMin && (
              <p className={style.validation}>{errors.heightMin}</p>
            )}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Maximun Height -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="heightMax"
              value={input.heightMax}
              required
            />
            {errors.heightMax && (
              <p className={style.validation}>{errors.heightMax}</p>
            )}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Minimun Weight -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="weightMin"
              value={input.weightMin}
              required
            />
            {errors.weightMin && (
              <p className={style.validation}>{errors.weightMin}</p>
            )}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Maximun Weight -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="weightMax"
              value={input.weightMax}
              required
            />
            {errors.weightMax && (
              <p className={style.validation}>{errors.weightMax}</p>
            )}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Dog Life Span -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="life_span"
              value={input.life_span}
              required
            />
            {errors.life_span && (
              <p className={style.validation}>{errors.life_span}</p>
            )}
          </label>
        </div>

        <div>
          <label className={style.text}>
            Dog Image -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="image"
              value={input.image}
              // required
            />
            {/* {errors.image && <p className={style.validation}>{errors.image}</p>} */}
          </label>
        </div>

        {/* <div>
          <label className={style.text}>
            Temperaments -
            <input
              className={style.input}
              onChange={(e) => handleInputChange(e)}
              type="text"
              name="temperament"
              value={input.temperament.join(", ")}
              disabled
            />
            {errors.temperament && (
              <p className={style.validation}>{errors.temperament}</p>
            )}
          </label>
        </div> */}

        <select className={style.select} onChange={(e) => handleSelect(e)}>
          <option hidden>Temperaments</option>
          {temperament.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <button className={style.button} type="submit">
          Create a dog
        </button>
      </form>

      {input.temperament.map((el) => (
        <div className={style.genBtn} key={el}>
          <button
            className={style.butnn}
            onClick={() => handleDeleteTemperaments(el)}
          >
            {el}
          </button>
        </div>
      ))}

      {/* {errors.temperament && (
        <p className={style.validation}>{errors.temperament}</p>
      )} */}

      <div>
        <Link to="/home">
          <button className={style.button}>Go back</button>
        </Link>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.name)) {
    errors.name = "Name can only contain leters";
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

  // if (!input.image) {
  //   errors.image = "Image url is required";
  // } else if (!input.image.includes("http")) {
  //   errors.image = "The image should have a valid url";
  // }

  if (!input.temperament) {
    errors.temperament = "Temperemnts are required";
  }

  return errors;
}
