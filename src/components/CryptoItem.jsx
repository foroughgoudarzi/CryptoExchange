import Logo from "./Logo";
import Price from "./Price";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FetchPriceData from "./FetchPriceData";
import { Pause } from "@mui/icons-material";

function CryptoItem(props) {

  const initialFund =
    localStorage.getItem("fund") != null &&
    localStorage.getItem("fund") != "undefined"
      ? JSON.parse(localStorage.getItem("fund"))
      : 0;

      const purchasedCoins =
      localStorage.getItem("purchasedCoins") != null &&
      localStorage.getItem("purchasedCoins") != "undefined"
        ? JSON.parse(localStorage.getItem("purchasedCoins"))
        : [{}];
  
    const [portfolio, setPortfolio] = useState(purchasedCoins);
  
   

  const [itemToBuy, setItemToBuy] = useState();
  const [show, setShow] = useState(false);
  const [numberToBuy, setNumberToBuy] = useState();
  const [fund, setFund] = useState(initialFund);

  const handleClose = () => setShow(false);
  
  const handleShow = (event) => {
    setItemToBuy(event.target.name);
    setShow(true);
  };

  const handleChange = (event) => {
    setNumberToBuy(event.target.value);
    
  }

  const handleBuy = () =>{
    const { data, error, isLoading } = FetchPriceData(props.abr);
    while(error || isLoading){
    Pause(1000);
    }
    const price = data.DISPLAY[props.abr].GBP.PRICE;
    if(price*numberToBuy>fund){
      alert("Fund is not enough!");
    } else{
      setFund(fund-price*numberToBuy);
      // props.handleBuy();
      setPortfolio({ ...portfolio, [itemToBuy]: true });
    }
  }

  useEffect(()=>{
    
  })

  return (
    <>
      <div className="container-fluid d-flex flex-row w-100 watchlist watch border rounded-3 p-3 align-items-center">
        <div className="col-3">
          <Logo name={props.name} abr={props.abr} size={props.size} />
        </div>

        <div className="col-5">
          <Price abr={props.abr.toUpperCase()} />
        </div>

        <div className="col-2">
          <Button
            variant="primary"
            name={props.abr}
            onClick={handleShow}
            className="btn btn-dark w-75 p-0 pt-2 pb-2"
          >
            Buy
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Buying {itemToBuy}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder="Please enter the number of coins to buy"
                value={numberToBuy}
                onChange={handleChange}
              ></input>
            </Modal.Body>
            <div className="d-flex justify-content-center">Available fund: £{fund}</div>
            <Modal.Footer>
              
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleBuy}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="col-2">
          <button
            className="btn btn-danger w-75 p-0 pt-2 pb-2"
            type="button"
            onClick={props.handleRemove}
            name={props.abr}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default CryptoItem;
