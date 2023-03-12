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
import MiniDrawer from './components/Navbar/MiniDrawer'


import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
    return (
        <ThemeProvider theme = {theme}>
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
                    {/* <Route path="/ProjectCreation" element={<ProjectCreationPage/>}/>
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path='/FormTemplates' element={<FormTemplateIndex />} />
                    <Route path='/FormResponses' element={<FormResponseIndex />} />
                    <Route path="/FormBuilder" element={<FormBuilder />} />
                    <Route path="/FormView" element={<FormView />} /> */}
                </Routes>
                </MiniDrawer>
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

        contrastThreshold: 3,
        tonalOffset: 0.2,
    }
});

export default App;
