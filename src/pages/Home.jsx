import React from "react";
import { Typography } from "@mui/material";
import Price from "../components/Price";
import Logo from "../components/Logo";
import crypto from "../data/crypto.json";
import Card from "../components/Card/index.jsx";

const Home = () => {
  return (
    <Typography variant="h6" component="div">
      <div>
        <Card />
      </div>
    </Typography>
  );
};
export default Home;
