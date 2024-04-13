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
            handleShowBuy={props.handleShowBuy}
            handleCloseBuy={props.handleCloseBuy}
            fund={props.fund}
            show={props.show}
            numberToBuy={props.numberToBuy}
            itemToBuy={props.itemToBuy}
            handleChangeBuy={props.handleChangeBuy}
            handleBuy={props.handleBuy}

          />
        ))}
      </h4>
    
  );
}

export default RenderItems;
