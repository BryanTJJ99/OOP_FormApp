import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import MiniDrawer from './components/Navbar/MiniDrawer';
import MiniDrawer from "./components/Navbar/MiniDrawer";
import RequireAuth from "./components/RequireAuth";
import AccountCreationPage from "./pages/AccountCreationPage";
import AccountManagementPage from "./pages/AccountManagementPage";
import ClientVendorProfile from "./pages/clientVendorProfile";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/formBuilder";
import FormResponse from "./pages/formResponse";
import FormResponseIndex from "./pages/formResponseIndex";
import FormTemplateIndex from "./pages/formTemplateIndex";
import FormView from "./pages/formView";
import Home from "./pages/index";
import LogIn from "./pages/LogIn";
import ProjectCreationPage from "./pages/ProjectCreationPage";
import Project from "./pages/ProjectPage";
import Settings from "./pages/Settings";
import Unauthorized from "./components/Unauthorized";


import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

const ROLES = {
    VENDOR: "ROLE_VENDOR",
    ADMIN: "ROLE_ADMIN",
    APPROVER: "ROLE_CLIENT",
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
                            {/* Routes for unauthenticated users */}
                            <Route exact path="/" element={<LogIn />} />
                            {/* public routes */}
                            <Route path="Home" element={<Home />} />


                            {/* Protected routes all authenticated users */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.APPROVER, ROLES.VENDOR]} />}>
                                <Route path="Settings" element={<Settings />} />
                                <Route path="Home" element={<Home />} />
                                <Route path="FormView" element={<FormView />} />
                                <Route path="Unauthorized" element={<Unauthorized />} />

                            </Route>

                            {/* Protected routes ADMIN and Approver */}
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

                            {/* Routes for Vendor */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.VENDOR]} />}>
                                <Route path="ClientVendorProfile" element={<ClientVendorProfile />} />
                            </Route>
                        
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
