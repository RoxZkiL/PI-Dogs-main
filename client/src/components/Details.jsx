import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDetails, cleaner, cleanDog, deleteDog } from "../actions";
import { useParams } from "react-router";
import style from "./Details.module.css";
import Loader from "./Loader";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

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
      alert("The dog was successfully deleted");
      navigate("/home");
    }
  }

  return (
    <div className={style.classDiv}>
      {dogDetails.id ? (
        <div className={style.detail}>
          <img className={style.img} src={dogDetails.image} alt="Not Found" />
          <h2 className={style.h2}>{dogDetails.name} </h2>
          <h5>Minimun height: {dogDetails.heightMin} Cm</h5>
          <h5>Maximun height: {dogDetails.heightMax} Cm</h5>
          <h5>Minimun weight: {dogDetails.weightMin} Kg</h5>
          <h5>Maximun weight: {dogDetails.weightMax} Kg</h5>
          <h5>Life span: {dogDetails.life_span} Years</h5>
          <h5>Temperaments: {dogDetails.temperament}</h5>
          <Link to="/home">
            <button className={style.button}>HOME</button>
          </Link>
          {dogDetails.id.length > 5 ? (
            <button className={style.button2} onClick={(e) => handleDelete(e)}>
              DELETE THIS DOG
            </button>
          ) : null}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
