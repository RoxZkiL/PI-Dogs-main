import React from "react";
import style from "./Paginado.module.css";

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumber?.map((number) => (
          <li className="el" key={number}>
            <a onClick={() => paginated(number)}> {-number}- </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
