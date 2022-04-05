import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByQuery } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByQuery(name));
    setName("");
  }

  //MANEJO ESTADO LOCAL LO QUE ESCRIBE EL USUARIO SE GUARDA EN MI ESTADO LOCAL NAME Y ESO ES LO QUE DESPACHO

  return (
    <div>
      <input
        value={name}
        type="text"
        placeholder="Search Dogs"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
