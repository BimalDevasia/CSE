import React from "react";

import "./Landing.scss";
import front from "../assets/front.png";


function Landing() {
  return (
    <div className="Landing">
      <section className="Hero">
        <p>Cse Association Presents</p>
        <h1 className="heading">CSE CUP</h1>
        <img  src={front} alt="" />
      </section>
    </div>
  );
}

export default Landing;
