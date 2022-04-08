import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs } from "../actions";
import style from "./ChargeAllDogs.module.css";

export default function ChargeAllDogs() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  return (
    <div className={style.paddingTop}>
      <Link to="/dogs">
        <button
          className={style.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Render all dogs
        </button>
      </Link>
      <Link to="/dog">
        <button className={style.button}>Create a dog</button>
      </Link>
    </div>
  );
}
