import React from "react";
import logo from "./icons8-linkedin-50.png";
import logo2 from "./icons8-github-50.png";
import style from "./About.module.css";

export default function About() {
  return (
    <div className={style.div}>
      <a
        href="https://github.com/RoxZkiL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={style.img} src={logo2} alt="Not found" />
      </a>
      <div className={style.div2}>
        <a
          href="https://www.linkedin.com/in/jes%C3%BAs-matute-079b0b209/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Not found" />
        </a>
      </div>
    </div>
  );
}
