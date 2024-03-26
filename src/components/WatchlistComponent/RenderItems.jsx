import CryptoItem from "../CryptoItem";
import crypto from "../../data/crypto.json";
import { useEffect, useState } from "react";

function RenderItems(props) {
  const purchasedCoins =
    localStorage.getItem("purchasedCoins") != null &&
    localStorage.getItem("purchasedCoins") != "undefined"
      ? JSON.parse(localStorage.getItem("purchasedCoins"))
      : [{}];

  ////moved from crypto
  // const list= JSON.parse(localStorage.getItem("cryptoList"));
  const [portfolio, setPortfolio] = useState(purchasedCoins);

  const handleBuy = (event) => {
    setPortfolio({ ...portfolio, [event.target.name]: true });
  };

  const findName = (element) =>
    crypto.find((e) => e.abbreviation == element).name;
  const findId = (element) => crypto.find((e) => e.abbreviation == element).id;

  return (
    <>
      <h4>
        {props.selected.map((element) => (
          <CryptoItem
            name={findName(element)}
            abr={element}
            size="40px"
            key={findId(element)}
            handleRemove={props.handleRemove}
            handleBuy={handleBuy}
          />
        ))}
      </h4>
    </>
  );
}

export default RenderItems;
