import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import crypto from "../../data/crypto.json";
import Logo from "../Logo";
import RenderItems from "./RenderItems";
import FetchPriceData from "../FetchPriceData";

function WatchList() {
  const cryptoList =
    localStorage.getItem("cryptoList") != null &&
    localStorage.getItem("cryptoList") != "undefined"
      ? JSON.parse(localStorage.getItem("cryptoList"))
      : {};

  // If cryptoList in local storage is empty initialise it
  if (Object.keys(cryptoList).length === 0) {
    crypto.forEach((element) => {
      cryptoList[element.abbreviation] = false;
    });
  }

  const [form, setForm] = useState(cryptoList);
  const [dummyForm, setDummyForm] = useState(cryptoList);
  const [selected, setSelected] = useState(
    Object.keys(dummyForm).filter((element) => dummyForm[element])
  );

  useEffect(() => {
    setSelected(Object.keys(dummyForm).filter((element) => dummyForm[element]));
    localStorage.setItem("cryptoList", JSON.stringify(dummyForm));
  }, [dummyForm]);

  const [showL, setShowL] = useState(false);
  const handleClose = () => {
    setShowL(false);
    setForm(dummyForm);
  };
  const handleShow = () => {
    setShowL(true);
  };

  const handleCloseAndSave = () => {
    setShowL(false);
    setDummyForm(form);
  };

  const handleChangeWatchlist = (event) => {
    const { id, checked } = event.target;
    setForm({ ...form, [id]: checked });
  };

  const handleRemove = (event) => {
    setDummyForm({ ...dummyForm, [event.target.name]: false });
    setForm({ ...form, [event.target.name]: false });
  };

  // For Portfolio
  const initialFund =
    localStorage.getItem("fund") != null &&
    localStorage.getItem("fund") != "undefined"
      ? JSON.parse(localStorage.getItem("fund"))
      : 0;

  const initialPortfolio =
    localStorage.getItem("portfolio") != null &&
    localStorage.getItem("portfolio") != "undefined"
      ? JSON.parse(localStorage.getItem("portfolio"))
      : {};

  const [portfolio, setPortfolio] = useState(initialPortfolio);

  const [show, setShow] = useState(false);
  const [numberToBuy, setNumberToBuy] = useState();
  const [itemToBuy, setItemToBuy] = useState();
  const [fund, setFund] = useState(initialFund);

  const handleCloseBuy = () => {
    setShow(false);
    setNumberToBuy();
  };

  const handleShowBuy = (event) => {
    setItemToBuy(event.target.name);
    setShow(true);
  };

  const handleChangeBuy = (event) => {
    setNumberToBuy(event.target.value);
  };

  const { data, error, isLoading } = FetchPriceData(itemToBuy);
  const handleBuy = () => {
    
    const price = parseFloat(
      data.DISPLAY[itemToBuy].GBP.PRICE.replace(/[^0-9.]/g, "")
    );
    console.log("price", price);
    if (isNaN(numberToBuy) || numberToBuy <= 0) {
      alert("Invalid amount!");
    } else if (price * numberToBuy > fund) {
      alert("Fund is not enough!");
    } else {
      setFund(fund - price * numberToBuy);
      let total = portfolio[itemToBuy] !=null? parseInt(portfolio[itemToBuy])+parseInt(numberToBuy) : numberToBuy;
      console.log("total", total)
      // total =
      setPortfolio({ ...portfolio, [itemToBuy]: total });
      setShow(false);
      setNumberToBuy();
    }
  };

  useEffect(() => {
    localStorage.setItem("fund", JSON.stringify(fund));
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio, fund]);

  // End for portfolio

  return (
    <>
      {/* Header */}
      <div className="container-fluid d-flex flex-row w-100 watchlistheader border rounded p-3 pb-0 align-items-center">
        <div className="col-3">
          <p className="mb-0 fs-5">Market</p>
        </div>

        <div className="col-5 fs-5">
          <p className="mb-0 ms-5">
            Price<span className="ms-5 ps-4">Change 1D</span>
          </p>
        </div>

        <div className="col-2"></div>

        <div className="col-2">
          <Button
            className="btn btn-light pt-2 pb-2"
            type="button"
            onClick={handleShow}
          >
            Add/Remove
          </Button>

          {/* Modal */}
          <Modal show={showL} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>CryptoCurrency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*Opens a list of cryptos */}
              <Form>
                {crypto.map((element) => (
                  <div key={element.name} className="mb-3">
                    <Form.Check id={element.abbreviation}>
                      <Form.Check.Input
                        type="checkbox"
                        name={element.name}
                        isValid
                        checked={form[element.abbreviation]}
                        onChange={handleChangeWatchlist}
                      />
                      <Form.Check.Label>
                        <Logo
                          name={element.name}
                          abr={element.abbreviation}
                          size="25px"
                        />
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseAndSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <RenderItems selected={selected} handleRemove={handleRemove} handleShowBuy={handleShowBuy} handleCloseBuy={handleCloseBuy}
            numberToBuy={numberToBuy} fund={fund} show={show} itemToBuy={itemToBuy} handleChangeBuy={handleChangeBuy} handleBuy={handleBuy} />
    </>
  );
}

export default WatchList;
