import Logo from "../Logo";
import Price from "../Price";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function PortfolioItem(props) {
    
  return (
    <>
      <div className="container-fluid d-flex flex-row w-100 portfolio border rounded-3 p-3 align-items-center">
        <div className="col-3 ms-0">
          <Logo name={props.name} abr={props.abr} size={props.size} />
        </div>

        <div className="col-4">
          <Price abr={props.abr.toUpperCase()} />
        </div>

        <div className="col-3">
          <p>{props.amount}</p>
        </div>

        <div className="col-2">
          <Button variant="primary" 
            name={props.abr}
            onClick={props.handleSell}
            className="btn btn-danger w-75 p-0 pt-2 pb-2"
          >
            Sell
          </Button>
          {/* Modal */}
          <Modal show={props.show} onHide={props.handleClose} style={{
              background: "rgb(253, 253, 253, 0.1)",
            }}>
        <Modal.Header closeButton>
          <Modal.Title>Selling {props.itemToSell}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form.Control size="lg" type="number" placeholder="Please enter the number of coins to sell" 
                value={props.numberToSell}
                onChange={props.handleChange}
                /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </>
  );
}

export default PortfolioItem;
