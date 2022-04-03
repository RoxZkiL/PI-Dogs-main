import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  orderByWeight,
  orderAlphabetically,
  createdInDb,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //Me trae del reducer el estado dogs con todos los perros
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const LastDogIndex = currentPage * dogsPerPage;
  const FirstDogIndex = LastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(FirstDogIndex, LastDogIndex);
  const [order, setOrder] = useState("");

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  function handerSortAlphabetically(e) {
    e.preventDefault();
    dispatch(orderAlphabetically(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleCreatedDb(e) {
    e.preventDefault();
    dispatch(createdInDb(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Link to="/dogs"></Link>
      <h1>PI DOGGOS</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        cargar todos los doggies
      </button>
      <div>
        <select onChange={(e) => handerSortAlphabetically(e)}>
          <option>Order Alphabetically</option>
          <option value="ascendente">A to Z</option>
          <option value="descendente">Z to A</option>
        </select>
        <select onChange={(e) => handleSortWeight(e)}>
          <option>Order by weight</option>
          <option value="weightMin">Min weight</option>
          <option value="weightMax">Max weight</option>
        </select>
        <select>
          <option value="temperamentos">All temperament</option>
        </select>
        <select onChange={(e) => handleCreatedDb(e)}>
          <option>Filtered dogs</option>
          <option value="apiDogs">Dogs from api</option>
          <option value="dbDogs">Dogs from database</option>
        </select>
      </div>
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated={paginated}
      />
      {currentDogs?.map((el) => {
        return (
          <div key={el.id}>
            <Link to={"/home/" + el.id}>
              <Card
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                weightMin={el.weightMin}
                weightMax={el.weightMax}
                temperament={el.temperament}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
