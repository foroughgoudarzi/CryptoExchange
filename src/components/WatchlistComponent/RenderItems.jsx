import CryptoItem from "../CryptoItem";
import crypto from "../../data/crypto.json";
import { useState } from "react";

function RenderItems(props) {
  

  const findName = (element) =>
    crypto.find((e) => e.abbreviation == element).name;
  const findId = (element) => crypto.find((e) => e.abbreviation == element).id;

  return (
    
      <h4>
        {props.selected.map((element) => (
          <CryptoItem
            name={findName(element)}
            abr={element}
            size="40px"
            key={findId(element)}
            handleRemove={props.handleRemove}
            // handleBuy={handleBuy}
          />
        ))}
      </h4>
    
  );
}

export default RenderItems;
