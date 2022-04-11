import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({
  id,
  image,
  name,
  weightMin,
  weightMax,
  temperament,
}) {
  return (
    <div className={style.card} key={id}>
      <img className={style.img} src={image} alt="Not found" />
      <h3 className={style.h3}>{name}</h3>
      <h5 className={style.h5}>{temperament}</h5>
      <div className={style.divH5}>
        <span className={style.h5}>Min weight : {weightMin} </span>
        <span className={style.h5}>Max weight : {weightMax} </span>
      </div>
      <div>
        <Link to={`/home/${id}`}>
          <button className={style.button}>Dog info</button>
        </Link>
      </div>
    </div>
  );
}
