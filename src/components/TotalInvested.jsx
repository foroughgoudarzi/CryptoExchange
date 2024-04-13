import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function TotalInvested() {
  // LOCAL STORAGE
  const initialFund =
    localStorage.getItem("fund") != null &&
    localStorage.getItem("fund") != "undefined"
      ? JSON.parse(localStorage.getItem("fund"))
      : 0;

  const [fund, setFund] = useState(initialFund);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState();

  const handleClose = () => {
    setShow(false);
    setAmount();
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddFund = () => {
    if (isNaN(amount)) {
      alert("Invalid amount!");
    } else {
      setFund(parseFloat(fund) + parseFloat(amount));
    }
    setShow(false);
    setAmount();
  };

  const handleWithdrawFund = () => {
    if (isNaN(amount) || amount > fund) {
      alert("Invalid amount!");
    } else {
      setFund(fund - amount);
    }

    setShow(false);
    setAmount();
  };

  useEffect(() => {
    localStorage.setItem("fund", JSON.stringify(fund));
  }, [fund]);

  return (
    <div>
      <h5 className="text-dark">Available Fund</h5>
      <Alert
        className="bg-success fs-5 justify-content-center"
        variant="filled"
        severity="info"
      >
        £{fund.toFixed(5)}
      </Alert>
      {/* <button className='btn btn-dark mt-4'>Add/Withdraw fund</button> */}
      <Button
        variant="primary"
        // name={props.abr.toUpperCase()}
        onClick={handleShow}
        className="btn btn-dark mt-4"
      >
        Add/Withdraw fund
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        style={{
          background: "rgb(253, 253, 253, 0.1)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add/Withdraw Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="lg"
            type="number"
            placeholder="Enter the amount of fund"
            value={amount}
            onChange={handleChange}
          />
        </Modal.Body>
        <div className="d-flex justify-content-center">
          Available fund: £{fund.toFixed(5)}
        </div>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleAddFund}
            className="btn btn-primary"
          >
            Add
          </Button>
          <Button
            variant="primary"
            onClick={handleWithdrawFund}
            className="btn btn-danger"
          >
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TotalInvested;
