import React from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ChargeAllDogs from "./ChargeAllDogs";

export default function Home() {
  return (
    <div>
      <h1>PI DOGGOS</h1>
      <SearchBar />
      <ChargeAllDogs />
      <Filters />
    </div>
  );
}
