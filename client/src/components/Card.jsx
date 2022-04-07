import React from "react";

import style from "./Card.module.css";

export default function Card({
  id,
  image,
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  temperament,
}) {
  return (
    <div className={style.card} key={id}>
      <img className={style.img} src={image} alt="img not found" />
      <h3>{name}</h3>
      <h5>{temperament}</h5>
      <h5>Min height: {heightMin}</h5>
      <h5>Max height: {heightMax}</h5>
      <h5>Min weight: {weightMin}</h5>
      <h5>Max weight: {weightMax}</h5>
    </div>
  );
}
