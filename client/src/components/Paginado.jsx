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
            <li onClick={() => paginated(currentPage - 1)}>
              <button className={style.li}>Prev</button>
            </li>
          ) : null}
          <li onClick={() => paginated(currentPage)}>
            <button className={style.li}>{currentPage}</button>
          </li>
          {currentPage < allDogs / dogsPerPage ? (
            <li onClick={() => paginated(currentPage + 1)}>
              <button className={style.li}>Next</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

// {
//   {pageNumber?.map((number) => (
// }
// {
//    <li
//     className={style.li}
//     key={number}
//     onClick={() => paginated(number)}
//   >
//     <a>{number}</a>
// }
// {
//    </li>
// }
// {
//    ))}
// }
