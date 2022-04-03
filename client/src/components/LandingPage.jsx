import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Pinche Dog PI!!!</h1>
      <Link to="/home">
        <button>Go to DogPI!</button>
      </Link>
    </div>
  );
}
