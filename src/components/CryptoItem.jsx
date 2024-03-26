import Logo from "./Logo";
import Price from "./Price";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CryptoItem(props) {
  const [itemToBuy, setItemToBuy] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setItemToBuy(event.target.name);

    setShow(true);
  };

  return (
    <>
      <div className="container-fluid d-flex flex-row w-100 border rounded-3 p-3 m-3 border-black bg-light border-2 align-items-center">
        <div className="col-3">
          <Logo name={props.name} abr={props.abr} size={props.size} />
        </div>

        <div className="col-5">
          <Price abr={props.abr.toUpperCase()} />
        </div>

        <div className="col-2">
          <Button variant="primary" name={props.abr} onClick={handleShow}>
            Buy
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Buying {itemToBuy}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Please enter the number of coins to buy"
              ></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={props.handleBuy}>
                Save
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
