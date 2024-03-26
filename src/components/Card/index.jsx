import React from "react";
import "./style.css";
import crypto from "../../data/crypto.json";
import CardItem from "./CardItem";

function Card() {
  return (
    <div className="d-flex flex-row flex-wrap mt-5 align-middle">
      {crypto.map((element) => (
        <div className="card" key={element.id}>
          <CardItem
            name={element.name}
            abr={element.abbreviation}
            size="20px"
          />
        </div>
      ))}
    </div>
  );
}

export default Card;
