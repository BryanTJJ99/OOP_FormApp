import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import AccountManagementPage from "./pages/AccountManagementPage";
import AccountCreationPage from "./pages/AccountCreationPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import FormTemplateIndex from "./pages/formTemplateIndex";
import FormResponseIndex from "./pages/formResponseIndex";
import FormBuilder from "./pages/formBuilder";
import FormView from "./pages/formView";

import { createTheme, ThemeProvider,responsiveFontSizes } from '@mui/material/styles';


function App() {
    return (
        <>
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
        </div>
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar >
                <Routes>
                    <Route exact path="/Home" element={<Home />} />
                    <Route
                        path="/AccountManagement"
                        element={<AccountManagementPage />}
                    />
                    <Route
                        path="/AccountCreation"
                        element={<AccountCreationPage />}
                    />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path='/FormTemplates' element={<FormTemplateIndex />} />
                    <Route path='/FormResponses' element={<FormResponseIndex />} />
                    <Route path="/FormBuilder" element={<FormBuilder />} />
                    <Route path="/FormView" element={<FormView />} />
                </Routes>
                </Navbar>
            </Router>
        </ThemeProvider>
        </>
    );
}



let theme = createTheme({
    typography:{
        fontFamily: ['Poppins','sans-serif'].join(','),
    },
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
    }
});
theme = responsiveFontSizes(theme); //makes font responsive
export default App;
