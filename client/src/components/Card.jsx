import React from "react";

export default function Card({
  id,
  image,
  name,
  weightMin,
  weightMax,
  temperament,
}) {
  return (
    <div key={id}>
      <img src={image} alt="img not found" />
      <h3>{name}</h3>
      <h5>{temperament}</h5>
      <h5>{weightMin}</h5>
      <h5>{weightMax}</h5>
    </div>
  );
}
