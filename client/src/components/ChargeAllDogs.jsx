import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs } from "../actions";

export default function ChargeAllDogs() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  return (
    <div>
      <Link to="/dogs">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Render all dogs
        </button>
      </Link>
    </div>
  );
}
