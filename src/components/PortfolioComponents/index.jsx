import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PortfolioItem from "./PortfolioItem";
import crypto from "../../data/crypto.json";
import FetchPriceData from "../FetchPriceData";
import { Pause } from "@mui/icons-material";

function Basket() {
  const initialPortfolio =
    localStorage.getItem("portfolio") != null &&
    localStorage.getItem("portfolio") != "undefined"
      ? JSON.parse(localStorage.getItem("portfolio"))
      : {};

  const initialFund =
    localStorage.getItem("fund") != null &&
    localStorage.getItem("fund") != "undefined"
      ? JSON.parse(localStorage.getItem("fund"))
      : 0;

  const findName = (element) =>
    crypto.find((e) => e.abbreviation == element).name;
  const findId = (element) => crypto.find((e) => e.abbreviation == element).id;

  // const { data, error, isLoading } = FetchPriceData(itemToSell);

  const [show, setShow] = useState(false);
  const [itemToSell, setItemToSell] = useState("BTC");
  const [numberToSell, setNumberToSell] = useState();
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [fund, setFund] = useState(initialFund);

  const handleSell = (event) => {
    setItemToSell(event.target.name);

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setNumberToSell(0);
  };

  const handleChange = (event) => {
    setNumberToSell(event.target.value);
  };

  const { data, error, isLoading } = FetchPriceData(itemToSell);
  const handleConfirm = () => {
    const price = parseFloat(
      data.DISPLAY[itemToSell].GBP.PRICE.replace(/[^0-9.]/g, "")
    );
    console.log("price", price);
    if (numberToSell <= 0 || numberToSell > parseInt(portfolio[itemToSell])) {
      alert("Invalid amount!");
    } else {
      setFund(fund + price * numberToSell);
      const num = parseInt(portfolio[itemToSell]) - numberToSell;
      setPortfolio({ ...portfolio, [itemToSell]: num });

      if (num == 0) {
        console.log("num===0");
        const newObj = {};
        for (const key in portfolio) {
          if (key != itemToSell) newObj[key] = portfolio[key];
          setPortfolio({ ...newObj });
        }
      }

      setShow(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("fund", JSON.stringify(fund));
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio, fund]);

  return (
    <>
      {/* Header */}
      <div className="container-fluid d-flex flex-row w-100 portfolioheader border rounded-3 p-3 pb-0 mt-4 align-items-center">
        <div className="col-3">
          <p className="mb-0 fs-5 ms-0">Market</p>
        </div>

        <div className="col-4 fs-5">
          <p className="mb-0 ms-4">
            Price<span className="ms-4 ps-4">Change 1D</span>
          </p>
        </div>

        <div className="col-3">
          <p className="mb-0 fs-5">Amount</p>
        </div>

        <div className="col-2"></div>
      </div>

      {/* Items */}
      <h4>
        {Object.keys(portfolio).map((element) => (
          <PortfolioItem
            name={findName(element)}
            abr={element}
            size="40px"
            key={findId(element)}
            handleSell={handleSell}
            amount={portfolio[element]}
            show={show}
            handleClose={handleClose}
            itemToSell={itemToSell}
            handleConfirm={handleConfirm}
            handleChange={handleChange}
          />
        ))}
      </h4>
    </>
  );
}

export default Basket;
