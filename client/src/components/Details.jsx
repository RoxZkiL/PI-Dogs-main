import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDetails, cleaner, deleteDog, cleanDog } from "../actions";
import { useParams } from "react-router";
import style from "./Details.module.css";
import Loader from "./Loader";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    dispatch(cleaner());
  }

  useEffect(() => {
    dispatch(cleaner());
    dispatch(getDetails(id));
    dispatch(cleanDog());
  }, [dispatch, id]);

  const dogDetails = useSelector((state) => state.details);

  function handleDelete(e) {
    if (dogDetails.id.length > 5) {
      e.preventDefault();
      dispatch(deleteDog(id));
      dispatch(cleaner());
      alert("perro borrado");
      navigate("/home");
    }
  }

  return (
    <div className={style.classDiv} onClick={(e) => handleClick(e)}>
      {dogDetails.id ? (
        <div className={style.detail}>
          {dogDetails.id.length > 5 ? (
            <button className={style.button} onClick={(e) => handleDelete(e)}>
              DELETE THIS DOG
            </button>
          ) : null}
          <img className={style.img} src={dogDetails.image} alt="Not found" />
          <h2 className={style.h2}>{dogDetails.name} </h2>
          <h5>Peso Max: {dogDetails.weightMax}</h5>
          <h5>Peso Min: {dogDetails.weightMin} </h5>
          <h5>Altura Max: {dogDetails.heightMax} </h5>
          <h5>Altura Min: {dogDetails.heightMin} </h5>
          <h5>Temperamentos: {dogDetails.temperament}</h5>
          <h5>Tiempo de vida: {dogDetails.life_span} </h5>
          <Link to="/home">
            <button className={style.button}>Go Back</button>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
