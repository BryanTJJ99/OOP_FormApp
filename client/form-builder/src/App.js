import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import AccountManagementPage from "./pages/AccountManagementPage";
import AccountCreationPage from "./pages/AccountCreationPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import FormBuilder from "./pages/formBuilder";
import FormView from "./pages/formView";

import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/Home' element={<Home />} />
        <Route path='/AccountManagementPage' element={<AccountManagementPage />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/FormBuilder' element={<FormBuilder />} />
        <Route path='/FormView' element={<FormView />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

const theme = createTheme({
    palette: {
        primary: {
            light: "#88CBED",
            main: "#1F87BC",
            contrastText: "#FFFFFF",
        },
        secondary: {
            light: "#BCBCBC",
            main: "#7F7F7F",
            contrastText: "#FFFFFF",
        },

        success: {
            light: "#A5DEB8",
            main: "#70C18C",
            contrastText: "#FFFFFF",
        },
        danger: {
            light: "#EBB4B4",
            main: "#EB8C8C",
            contrastText: "#FFFFFF",
        },
        warning: {
            light: "#F6DEAF",
            main: "#F4CC7E",
        },
        info: {
            light: "#A7E8F1",
            main: "#57B9C6",
            contrastText: "#FFFFFF",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    
  },
);

export default App;
