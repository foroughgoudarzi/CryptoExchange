import React from "react";
import "./style.css";
import Logo from "../../components/Logo";
import Price from "../../components/Price";

function CardItem(props) {
  return (
    <>
      <div className="d-inline">
        <Logo name={props.name} abr={props.abr} size={props.size} />
        <Price abr={props.abr.toUpperCase()} />
      </div>
    </>
  );
}

export default CardItem;
