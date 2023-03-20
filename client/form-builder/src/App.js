import React, { useState, useEffect, useNavigate } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
// import MiniDrawer from './components/Navbar/MiniDrawer';
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

import AuthService from "./services/authService";
import EventBus from "./common/EventBus";

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    // declaring the useStates for the specific pages we want to render
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showDashBoard, setShowDashBoard] = useState(false);
    const [showAccountManagement, setShowAccountManagement] = useState(false);
    const [showFormResponses, setShowFormResponses] = useState(false);
    const [showFormTemplates, setShowFormTemplates] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const [showClientVendorProfile, setShowClientVendorProfile] = useState(false);

    useEffect(() => {
        // retrieving user authentication data from backend
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);

            // checks for and displays if either values satisfies using.some() method
            setShowDashBoard(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
            setShowAccountManagement(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
            setShowFormResponses(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
            setShowFormTemplates(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
            setShowProject(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
            setShowClientVendorProfile(user.roles.includes("ROLE_VENDOR"));
        }  
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowDashBoard(false);
        setShowAccountManagement(false);
        setShowFormResponses(false);
        setShowFormTemplates(false);
        setShowProject(false);
        setShowClientVendorProfile(false);
    };
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
                    {/* <MiniDrawer> */}

                    <div>
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <Link to={"/"} className="navbar-brand">
                                OOP Form Builder
                            </Link>
                            <div className="navbar-nav mr-auto">
                                {/* <li className="nav-item">
                                    <Link to={"/Home"} className="nav-link">
                                        Home
                                    </Link>
                                </li> */}
                                {showDashBoard && (
                                    <li className="nav-item">
                                        <Link to={"/Dashboard"} className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                )}
                                {showAccountManagement && (
                                    <li className="nav-item">
                                        <Link to={"/AccountManagement"} className="nav-link">
                                            Account Management
                                        </Link>
                                    </li>
                                )}
                                {showFormResponses && (
                                    <li className="nav-item">
                                        <Link to={"/FormResponses"} className="nav-link">
                                            Form Responses
                                        </Link>
                                    </li>
                                )}
                                {showFormTemplates && (
                                    <li className="nav-item">
                                        <Link to={"/FormTemplates"} className="nav-link">
                                            Form Templates
                                        </Link>
                                    </li>
                                )}
                                {showProject && (
                                    <li className="nav-item">
                                        <Link to={"/Project"} className="nav-link">
                                            Project
                                        </Link>
                                    </li>
                                )}
                                {showClientVendorProfile && (
                                    <li className="nav-item">
                                        <Link to={"/ClientVendorProfile"} className="nav-link">
                                            Client Vendor Profile
                                        </Link>
                                    </li>
                                )}
                            </div>

                            {currentUser ? (    
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/Settings"} className="nav-link">
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                                                        <li className="nav-item">
                                        <a href="/FormView" className="nav-link">
                                            Form View
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/LogIn" className="nav-link" onClick={logOut}>
                                            Log Out
                                        </a>
                                    </li>


                                </div>
                            ) : (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/LogIn"} className="nav-link">
                                                LogIn
                                            </Link>
                                        </li>
                                    </div>
                            )}
                        </nav>
                        <div className="container mt-3">         
                            <Routes>
                                <Route exact path="/Home" element={<Home />} />
                                <Route exact path="/" element={<LogIn />} />
                                <Route path="/LogIn" element={<LogIn />} />
                                <Route path="/AccountManagement" element={<AccountManagementPage />}  />
                                <Route path="/AccountCreation" element={<AccountCreationPage />} />
                                <Route path="/Project" element={<Project/>}/>
                                <Route path="/ProjectCreation" element={<ProjectCreationPage/>}/>
                                <Route path="/Settings" element={<Settings />} />
                                <Route path="/Dashboard" element={<Dashboard />} />
                                <Route path='/FormTemplates' element={<FormTemplateIndex />} />
                                <Route path='/FormResponses' element={<FormResponseIndex />} />
                                <Route path="/FormBuilder" element={<FormBuilder />} />
                                <Route path="/FormView" element={<FormView />} />
                                <Route path="/FormResponse" element={<FormResponse />} />
                                <Route path="/ClientVendorProfile" element = {<ClientVendorProfile/>}/>
                            </Routes>
                        </div>  
                        {/* </MiniDrawer> */}
                    </div>
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
