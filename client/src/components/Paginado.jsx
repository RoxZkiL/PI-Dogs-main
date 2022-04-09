import React from "react";
import style from "./Paginado.module.css";

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  let pageNumber = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div className={style.mainDiv}>
      <nav>
        <ul className={style.paginado}>
          {pageNumber?.map((number) => (
            <li className={style.li} key={number}>
              <a onClick={() => paginated(number)}>{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
