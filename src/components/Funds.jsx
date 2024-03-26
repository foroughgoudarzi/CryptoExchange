import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import { v4 as uuidv4 } from "uuid";

function Funds(props) {
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), paid: "", totalBalance: "" },
  ]);
  const [addFunds, setAddFunds] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  ///--------Local storage---------//

  useEffect(() => {
    // Load inputFields data from local storage on component mount
    const storedInputFields = JSON.parse(localStorage.getItem("inputFields"));
    if (storedInputFields) {
      setInputFields(storedInputFields);
    }
  }, []);

  useEffect(() => {
    // Save inputFields data to local storage whenever it changes
    localStorage.setItem("inputFields", JSON.stringify(inputFields));
  }, [inputFields]);

  //-------------//

  const handleSubmit = (event) => {
    event.preventDefault();
    const paidAmount = inputFields.reduce(
      (total, field) => total + Number(field.paid || 0),
      0
    );

    let newTotalBalance = totalBalance + paidAmount;

    // Update the total balance for each input field
    const updatedInputFields = inputFields.map((field) => ({
      ...field,
      totalBalance: newTotalBalance,
    }));
    setInputFields(updatedInputFields);
    setAddFunds("");
    setAddFunds(newTotalBalance);
    setTotalBalance(newTotalBalance);
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((field) => {
      if (id === field.id) {
        return { ...field, paid: event.target.value };
      }
      return field;
    });
    setInputFields(newInputFields);
  };

  return (
    <Container>
      <h4>Total:</h4>
      <br />
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <TextField
              type="number"
              name="totalBalance"
              label="Total Balance"
              variant="filled"
              value={totalBalance}
              onChange={(event) => setTotalBalance(event.target.value)}
            />
            {/* Input field for paid amount */}
            <TextField
              type="number"
              name="paid"
              label="Paid"
              variant="filled"
              value={inputField.paid}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
          </div>
        ))}
        {/* Display total paid amount */}
        {/* <h3>Add funds: {addFunds}</h3> */}
        <br />
        {/* Submit button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Pay
        </Button>
      </form>
    </Container>
  );
}

export default Funds;
