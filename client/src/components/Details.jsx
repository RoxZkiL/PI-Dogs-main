import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails, cleaner } from "../actions";
import { useParams } from "react-router";
import style from "./Details.module.css";

export default function Details() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
    dispatch(cleaner());
  }, [dispatch, id]);

  if (details) {
    return (
      <div className={style.classDiv}>
        <div className={style.detail}>
          <img className={style.img} src={details.image} alt="Not found" />
          <h2>{details.name}</h2>
          <h5>Minimum weight: {details.weightMin} </h5>
          <h5>Maximum weight: {details.weightMax} </h5>
          <h5>Minimum height: {details.heightMin} </h5>
          <h5>Maximum height: {details.heightMax} </h5>
          <h5>Life span: {details.life_span} </h5>
          <h5>Temperaments: {details.temperament}</h5>
          <Link to="/home">
            <button>Go back</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Loading...
        <Link to="/home">
          <button>Go back</button>
        </Link>
      </div>
    );
  }
}
