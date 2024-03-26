import React, { useState, useffect } from "react";
import Alert from "@mui/material/Alert";

function TotalInvested() {
  // LOCAL STORAGE

  // const [purchasedCoins, setPurchasedCoins] = useState(getPurchasedCoins)

  //   const totalInvestments = investments.reduce((total, item) => {
  //     return (total = total + item.price)
  //   }, 0)

  //   const remainingFunds = funds - totalInvestments

  //   useEffect(() => {
  //     localStorage.setItem("purchasedItems", JSON.stringify(purchasedCoins));
  //   }, [purchasedCoins])

  // const alertType = totalInvestments > funds ? 'warning' : 'info'

  const getPurchasedCoins = () => {
    //   const data = JSON.parse(localStorage.getItem("purchasedCoins"));
    //   if (!data) return [];
    //   return data;
  };
  //

  // const totalInvestments = investments.reduce((total, item) => {
  //   return (total +=purchasedCoins);
  // }, 0);

  return (
    <div>
      <h3>Invested</h3>
      <Alert className="bg-dark" variant="filled" severity="info">
        {/* £{totalInvestments} */}
        675
      </Alert>
    </div>
  );
}

export default TotalInvested;
