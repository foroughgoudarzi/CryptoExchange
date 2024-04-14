import Logo from "./Logo";
import Price from "./Price";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CryptoItem(props) {
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
            name={props.abr.toUpperCase()}
            onClick={props.handleShowBuy}
            className="btn btn-dark w-75 p-0 pt-2 pb-2"
            itemToBuy={props.itemToBuy}
          >
            Buy
          </Button>

          <Modal
            show={props.show}
            onHide={props.handleCloseBuy}
            style={{
              background: "rgb(253, 253, 253, 0.1)",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Buying {props.itemToBuy}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Please enter the number of coins to buy"
                value={props.numberToBuy}
                onChange={props.handleChangeBuy}
              />
            </Modal.Body>
            <div className="d-flex justify-content-center">
              Available fund: £{props.fund.toFixed(5)}
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleCloseBuy}>
                Close
              </Button>
              <Button variant="primary" onClick={props.handleBuy}>
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
