import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  orderByWeight,
  orderAlphabetically,
  createdInDb,
  getTemperaments,
  filteredByTemperament,
} from "../actions";
import Card from "./Card";
import Paginated from "./Paginado";
import style from "./Filters.module.css";
import Loader from "./Loader";

export default function Filters() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //Me trae del reducer el estado dogs con todos los perros
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const LastDogIndex = currentPage * dogsPerPage;
  const FirstDogIndex = LastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(FirstDogIndex, LastDogIndex);
  const [order, setOrder] = useState("");
  const allTemperaments = useSelector((state) => state.temperaments);

  const loader = useSelector((state) => state.loader);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleTemperament(e) {
    e.preventDefault();
    dispatch(filteredByTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handerSortAlphabetically(e) {
    e.preventDefault();
    dispatch(orderAlphabetically(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleCreatedDb(e) {
    e.preventDefault();
    dispatch(createdInDb(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  // function handleOrder(e) {
  //   e.preventDefault();
  //   dispatch(orderWeight());
  //   setOrder(e.target.value);
  //   setCurrentPage(1);
  // }
  return (
    <div>
      {/* <button onClick={(e) => handleOrder(e)}>order button</button> */}
      <div className={style.containers}>
        <select
          className={style.select}
          onChange={(e) => handerSortAlphabetically(e)}
        >
          <option hidden>Order Alphabetically</option>
          <option value="ascendente">A to Z</option>
          <option value="descendente">Z to A</option>
        </select>

        <select className={style.select} onChange={(e) => handleSortWeight(e)}>
          <option hidden>Order by weight</option>
          <option value="weightMin">Min weight</option>
          <option value="weightMax">Max weight</option>
        </select>

        <select
          className={style.select}
          onChange={(e) => {
            handleTemperament(e);
          }}
        >
          <option hidden>All temperaments</option>
          {allTemperaments?.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <select className={style.select} onChange={(e) => handleCreatedDb(e)}>
          <option hidden>Filtered dogs</option>
          <option value="apiDogs">Dogs from api</option>
          <option value="dbDogs">Dogs from database</option>
        </select>
      </div>

      {allDogs.length > 8 ? (
        <Paginated
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginated={paginated}
          currentPage={currentPage}
        />
      ) : null}

      <div className={style.cardsConteiner}>
        {loader ? (
          <Loader />
        ) : (
          currentDogs?.map((el) => {
            return (
              <div key={el.id}>
                <Card
                  id={el.id}
                  name={el.name}
                  image={
                    el.image
                      ? el.image
                      : "https://i.ytimg.com/vi/0oBx7Jg4m-o/maxresdefault.jpg"
                  }
                  heightMin={el.heightMin}
                  heightMax={el.heightMax}
                  weightMin={el.weightMin}
                  weightMax={el.weightMax}
                  temperament={el.temperament}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
