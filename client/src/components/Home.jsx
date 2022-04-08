import React from "react";
import Filters from "./Filters";
import ChargeAllDogs from "./ChargeAllDogs";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.main}>
      <span className={style.h1}>IT'S ALL ABOUT THE DOGS</span>
      <ChargeAllDogs />
      <Filters />
    </div>
  );
}
