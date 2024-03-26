import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Link } from "react-router-dom";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Watchlist from "../pages/Watchlist";
import Portfolio from "../pages/Portfolio";
import WalletPage from "../pages/WalletPage";

import logo from "../assets/logo.png";
import "../index.css";

const drawerWidth = 240;

const pages = [
  {
    title: "Home",
    href: "/",
    icon: <HomeOutlinedIcon />,
    component: Home,
  },
  {
    title: "Watchlist",
    href: "/Watchlist",
    icon: <PeopleOutlinedIcon />,
    component: Watchlist,
  },
  {
    title: "Portfolio",
    href: "/Portfolio",
    icon: <ContactsOutlinedIcon />,
    component: Portfolio,
  },
  {
    title: "WalletPage",
    href: "/WalletPage",
    icon: <ReceiptOutlinedIcon />,
    component: WalletPage,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selecctedMenu, setSelectedMenu] = React.useState("/");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routes = pages.map((page) => (
    <Route key={page.title} path={page.href} element={<page.component />} />
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="red"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box component="img" sx={{ height: 60 }} alt="Logo" src={logo} />
            <Typography variant="h4" noWrap component="div">
              Crypto-Mock
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <MenuOpenIcon />
            </IconButton>
          </DrawerHeader>
          {/* <Divider /> */}
          <List>
            {pages.map((page, index) => (
              <ListItem
                key={page.title}
                disablePadding
                sx={{ display: "block" }}
                style={
                  page.href === selecctedMenu ? { backgroundColor: "red" } : {}
                }
                onClick={() => setSelectedMenu(page.href)}
              >
                <Link
                  to={page.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={page.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </Box>
  );
}
