import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MiniDrawer from "./components/Navbar/MiniDrawer";
import RequireAuth from "./components/AuthenticationFilter/AuthenticationFilter";
import AccountCreationPage from "./pages/AccountCreationPage";
import AccountManagementPage from "./pages/AccountManagementPage";
import VendorProfilePage from "./pages/VendorProfilePage";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/formBuilder";
import FormResponse from "./pages/formResponse";
import FormResponseIndex from "./pages/formResponseIndex";
import FormTemplateIndex from "./pages/formTemplateIndex";
import FormView from "./pages/formView";
import LogIn from "./pages/LogIn";
import Settings from "./pages/Settings";
import ProjectCreationPage from "./pages/ProjectCreationPage";
import Project from "./pages/ProjectPage";
import Unauthorized from "./components/AuthenticationFilter/UnauthorizedFilter";

// Empty pages for the time being to be edited and integrated with the RBAC routing structure on App.js
// import ClientProject from "./pages/clientProject";
// import ResponsePage from "./pages/ResponsesPage";

import { styled, useTheme, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// Mapping of assigned roles
const ROLES = {
    VENDOR: "ROLE_VENDOR",
    ADMIN: "ROLE_ADMIN",
    APPROVER: "ROLE_APPROVER",
}

function App() {

    return (
        <>
            <div>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
                    rel="stylesheet"
                ></link>
            </div>
            <ThemeProvider theme={theme}>
                <Router>
                    <MiniDrawer>
                        <Routes>
                            {/* Public Routes regardless Authenticated or Unauthenticated */}
                            <Route exact path="/" element={<LogIn />} />
                            <Route path="LogIn" element={<LogIn />} />
                            <Route path="Unauthorized" element={<Unauthorized />} />

                            {/* Protected routes for all Authenticated users */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.APPROVER, ROLES.VENDOR]} />}>
                                <Route path="Settings" element={<Settings />} />
                                <Route path="FormView" element={<FormView />} />
                            </Route>

                            {/* Protected routes for Admin and Approver, to be updated with additional routes if needed, 
                            if have MiniDrawer also need to reflect the same changes */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.APPROVER]} />}>
                                <Route path="Dashboard" element={<Dashboard />} />
                                <Route path="AccountManagement" element={<AccountManagementPage />}  />
                                <Route path="AccountCreation" element={<AccountCreationPage />} />
                                <Route path="Project" element={<Project/>}/>
                                <Route path="ProjectCreation" element={<ProjectCreationPage/>}/>
                                <Route path='FormTemplates' element={<FormTemplateIndex />} />
                                <Route path='FormResponses' element={<FormResponseIndex />} />
                                <Route path="FormBuilder" element={<FormBuilder />} />
                                <Route path="FormResponse" element={<FormResponse />} />
                            </Route>

                            {/* Protected routes for Vendor to be updated with additional routes if needed, 
                            if have MiniDrawer also need to reflect the same changes */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.VENDOR]} />}>
                                <Route path="VendorProfilePage" element={<VendorProfilePage />} />
                            </Route>

                        </Routes>
                    </MiniDrawer>
                </Router>
            </ThemeProvider>

        {/* Sample routing structure for easier reference for above codes and for final standardisation */}
        {/* <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
        </div>
        <ThemeProvider theme={theme}>
            <Router>
                <MiniDrawer>
                <Routes>
                    <Route exact path="/Dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/ProjectOutdated" element={<Project/>}/>
                    <Route path="/ProjectCreation" element={<ProjectCreationPage/>}/>
                    <Route path='/FormTemplates' element={<FormTemplateIndex />} />
                    <Route path='/Project' element={<FormResponseIndex />} />
                    <Route path="/FormBuilder" element={<FormBuilder />} />
                    <Route path="/FormView" element={<FormView />} />
                    <Route path="/FormResponse" element={<FormResponse />} />
                    <Route path="/AccountManagement" element={<AccountManagementPage />}/>
                    <Route path="/AccountCreation" element={<AccountCreationPage />}/>
                    <Route path="/ClientProject" element = {<ClientProject/>}/>
                </Routes>
                </MiniDrawer>
            </Router>
        </ThemeProvider> */}
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
