import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountManagementPage from "./pages/AccountManagementPage";
import AccountCreationPage from "./pages/AccountCreationPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import FormTemplateIndex from "./pages/formTemplateIndex";
import FormResponseIndex from "./pages/formResponseIndex";
import FormBuilder from "./pages/formBuilder";
import FormBuilderEdit from "./pages/formBuilderEdit";
import FormView from "./pages/formView";
import FormResponse from "./pages/formResponse";
import MiniDrawer from './components/Navbar/MiniDrawer'
import ClientProject from "./pages/clientProject";
import LogIn from "./pages/LogIn";
import Unauthorized from "./components/Authentication/UnauthorizedFilter";
import ProjectCreationPage from "./pages/ProjectCreationPage";
import Project from "./pages/ProjectPage";
import RequireAuth from "./components/Authentication/AuthenticationFilter";
import VendorProfilePage from "./pages/VendorProfilePage";
import ProjectView from "./pages/ProjectView";

// Incomplete pages for the time being to be edited and integrated with the RBAC routing structure on App.js
// import ClientProject from "./pages/clientProject";
// import ResponsePage from "./pages/ResponsesPage";

import { styled, useTheme, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';


// Mapping of assigned roles
const ROLES = {
    VENDOR: "ROLE_VENDOR",
    ADMIN: "ROLE_ADMIN",
    APPROVER: "ROLE_APPROVER",
};

function App() {

    const [createdAccount, setCreatedAccount] = useState(false);

    return (
        <>
            <div>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
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
                            <Route path="Unauthorized" element={<Unauthorized />} />

                            {/* Protected routes for all Authenticated users */}
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={[
                                            ROLES.ADMIN,
                                            ROLES.APPROVER,
                                            ROLES.VENDOR,
                                        ]}
                                    />
                                }
                            >
                                <Route path="Account" element={<Settings />} />
                                <Route path="FormView" element={<FormView />} />
                            </Route>

                            {/* Protected routes for Admin and Approver, to be updated with additional routes if needed, 
                            if have MiniDrawer also need to reflect the same changes */}
                            <Route element={ <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.APPROVER]} />} >
                                <Route exact path="Dashboard" element={<Dashboard />} />
                                <Route
                                    path="AccountManagement"
                                    element={
                                        <AccountManagementPage
                                            createdAccount={createdAccount}
                                            setCreatedAccount={
                                                setCreatedAccount
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="AccountCreation"
                                    element={
                                        <AccountCreationPage
                                            createdAccount={createdAccount}
                                            setCreatedAccount={
                                                setCreatedAccount
                                            }
                                        />
                                    }
                                />
                                <Route path="ProjectOutdated" element={<Project />} />
                                <Route
                                    path="ProjectCreation"
                                    element={<ProjectCreationPage />}
                                />
                                <Route
                                    path="FormTemplates"
                                    element={<FormTemplateIndex />}
                                />
                                <Route
                                    path="Project"
                                    element={<FormResponseIndex />}
                                />
                                <Route
                                    path="FormBuilder"
                                    element={<FormBuilder />}
                                />
                                <Route
                                    path="FormBuilderEdit"
                                    element={<FormBuilderEdit />}
                                />
                                <Route
                                    path="FormResponse"
                                    element={<FormResponse />}
                                />
                                <Route
                                    path="ProjectView"
                                    element={<ProjectView/>}
                                />
                            </Route>
                    

                            {/* Protected routes for Vendor to be updated with additional routes if needed, 
                            if have MiniDrawer also need to reflect the same changes */}
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={[ROLES.VENDOR]}
                                    />
                                }
                            >
                                <Route
                                    path="VendorProfilePage"
                                    element={<VendorProfilePage />}
                                />
                                <Route
                                    path="ClientProject"
                                    element={<ClientProject />}
                                />

                            </Route>
                        </Routes>
                    </MiniDrawer>
                </Router>
            </ThemeProvider>            

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
                    <Route path="/ClientProject" element={<ClientProject />} />
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
