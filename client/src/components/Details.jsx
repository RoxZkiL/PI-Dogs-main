import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails, cleaner } from "../actions";
import { useParams } from "react-router";

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
      <div>
        <img src={details.image} alt="Not found" />
        <h2>I am {details.name} </h2>
        <h5>Min weight: {details.weightMin} </h5>
        <h5>Max weight: {details.weightMax} </h5>
        <h5>Min height: {details.heightMin} </h5>
        <h5>Max height: {details.heightMax} </h5>
        <h5>Tiempo de vida: {details.life_span} </h5>
        <h5>Temperaments: {details.temperament}</h5>
        <Link to="/home">
          <button>Go back</button>
        </Link>
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
