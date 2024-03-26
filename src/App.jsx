import NavBar from "./components/Navbar.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#cccccc",
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "white",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "white",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#232323",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
    </>
  );
}

export default App;
