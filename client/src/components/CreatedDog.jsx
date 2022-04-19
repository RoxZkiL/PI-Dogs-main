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
  let [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.mainDiv}>
      <div className={style.h1}>
        <h1>CREATE YOUR OWN DOG</h1>
      </div>

      <div className={style.dogCreate}>
        <div className={style.created}>
          <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.inputDiv}>
              <label className={style.label}>Dog's Name -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="name"
                value={input.name}
                required
              />
              <span className={style.validation}>
                {errors.name && <p>{errors.name}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Min. Height -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="heightMin"
                value={input.heightMin}
                required
              />
              <span className={style.validation}>
                {errors.heightMin && <p>{errors.heightMin}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Max. Height -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="heightMax"
                value={input.heightMax}
                required
              />
              <span className={style.validation}>
                {errors.heightMax && <p>{errors.heightMax}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Min. Weight -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="weightMin"
                value={input.weightMin}
                required
              />
              <span className={style.validation}>
                {errors.weightMin && <p>{errors.weightMin}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Max. Weight -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="weightMax"
                value={input.weightMax}
                required
              />
              <span className={style.validation}>
                {errors.weightMax && <p>{errors.weightMax}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}> Life Span -</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="life_span"
                value={input.life_span}
                required
              />
              <span className={style.validation}>
                {errors.life_span && <p>{errors.life_span}</p>}
              </span>
            </div>

            <div className={style.divSelect}>
              <select
                className={style.select}
                onChange={(e) => handleSelect(e)}
              >
                <option hidden>Temperaments</option>
                {temperament.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
              <button className={style.buttonCreate} type="submit">
                CREATE A DOG
              </button>
            </div>
          </form>
          {input.temperament.map((el) => (
            <div className={style.divButnn} key={el}>
              <button
                className={style.butnn}
                onClick={() => handleDeleteTemperaments(el)}
              >
                {el}
              </button>
            </div>
          ))}
          <div className={style.homeButtonDiv}>
            <Link to="/home">
              <button className={style.buttonCreate}>HOME</button>
            </Link>
          </div>
        </div>
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
  } else if (input.heightMin < 1 || input.heightMin > 50) {
    errors.heightMin = "Minimun height should be between 0 and 50 Cms";
  }

  if (!input.heightMax) {
    errors.heightMax = "Maximun height is required";
  } else if (!/^([0-9])*$/.test(input.heightMax)) {
    errors.heightMax = "Maximun height should be a number";
  } else if (input.heightMax > 100) {
    errors.heightMax = "Maximum height can't be more than 100 Cms";
  } else if (input.heightMax === input.heightMin) {
    errors.heightMax = "Maximun height can't be equal than minimun height";
  }

  if (!input.weightMin) {
    errors.weightMin = "Minimun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMin)) {
    errors.weightMin = "Minimun weight should be a number";
  } else if (input.weightMin < 1 || input.weightMin > 50) {
    errors.weightMin = "Minimun weight should be between 0 and 50 Kgs";
  }

  if (!input.weightMax) {
    errors.weightMax = "Maximun weight is required";
  } else if (!/^([0-9])*$/.test(input.weightMax)) {
    errors.weightMax = "Maximun weight should be a number";
  } else if (input.weightMax > 100) {
    errors.weightMax = "Maximum weight can't be more than 100 Kgs";
  } else if (input.weightMax === input.weightMin) {
    errors.weightMax = "Maximun weight can't be equal than minimun weight";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (!/^([0-9])*$/.test(input.life_span)) {
    errors.life_span = "Dog's life span should be a number";
  }

  // if (!input.image) {
  //   input.image = "https://i.ytimg.com/vi/0oBx7Jg4m-o/maxresdefault.jpg";
  // } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(input.image)) {
  //   errors.image = "The image should have a valid url";
  // }

  if (!input.temperament) {
    errors.temperament = "Temperemnts are required";
  }

  return errors;
}
