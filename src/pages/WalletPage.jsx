import React from "react";
import { Box, Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { palette } from "@mui/system";
import { Typography } from "@mui/material";
import TotalInvested from "../components/TotalInvested";
import Funds from "../components/Funds";
import History from "../components/History";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const WalletPage = (props) => {
  const dateBuilder = () => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let d = new Date();
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <Container maxWidth="sm">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Item>
            <TotalInvested />
          </Item>
        </Box>
        <Box gridColumn="span 12">
          <Item>{dateBuilder()}</Item>
        </Box>
        <Box gridColumn="span 12">
          <Item>
            <Funds />
          </Item>
        </Box>
      </Box>
      {/* <Box gridColumn="span 12">
        <History />
      </Box> */}
    </Container>
  );
};

export default WalletPage;
