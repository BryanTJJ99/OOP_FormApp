import React from "react";
import "./App.css";
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
import FormResponse from "./pages/formResponse";
import MiniDrawer from './components/Navbar/MiniDrawer'
import ClientVendorProfile from "./pages/clientVendorProfile";


import { styled, useTheme, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';


import ProjectCreationPage from "./pages/ProjectCreationPage";
import ProjectPage from "./pages/ProjectPage";

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
                <MiniDrawer>
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
                    <Route path="/Project" element={<ProjectCreationPage/>}/>
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path='/FormTemplates' element={<FormTemplateIndex />} />
                    <Route path='/FormResponses' element={<FormResponseIndex />} />
                    <Route path="/FormBuilder" element={<FormBuilder />} />
                    <Route path="/FormView" element={<FormView />} />
                    <Route path="/FormResponse" element={<FormResponse />} />
                    <Route path="/ClientVendorProfile" element = {<ClientVendorProfile/>}/>
                </Routes>
                </MiniDrawer>
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
        cyan: {
            light: "#4db6ac",
            main: "#00acc1",
            contrastText: "#FFFFFF",
        },
        indigo: {
            light: "#8c9eff",
            main: "#536dfe",
            contrastText: "#FFFFFF",
        },
        grey: { 
            light: "#d4d4d4", 
            main: "#8f8f8f",
            contrastText: "#000000",
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,
    }
});
theme = responsiveFontSizes(theme); //makes font responsive
export default App;
