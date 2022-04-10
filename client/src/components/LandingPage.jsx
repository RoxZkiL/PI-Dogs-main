import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.body}>
      <h1 className={style.neons}>Who let the dogs out?</h1>
      <Link to="/home">
        <button className={style.button}>HOME PAGE</button>
      </Link>
    </div>
  );
}
