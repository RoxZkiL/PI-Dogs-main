import React from "react";
import style from "./Paginado.module.css";

export default function Paginated({
  dogsPerPage,
  allDogs,
  paginated,
  currentPage,
}) {
  let pageNumber = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div className={style.mainDiv}>
      <nav>
        <ul className={style.paginado}>
          {currentPage > 1 ? (
            <li className={style.li} onClick={() => paginated(currentPage - 1)}>
              <a>Prev</a>
            </li>
          ) : null}
          <li className={style.li} onClick={() => paginated(currentPage)}>
            <a>{currentPage}</a>
          </li>
          {currentPage < allDogs / dogsPerPage ? (
            <li className={style.li} onClick={() => paginated(currentPage + 1)}>
              <a>Next</a>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

{
  /* {pageNumber?.map((number) => ( */
}
{
  /* <li
    className={style.li}
    key={number}
    onClick={() => paginated(number)}
  >
    <a>{number}</a> */
}
{
  /* </li> */
}
{
  /* ))} */
}
