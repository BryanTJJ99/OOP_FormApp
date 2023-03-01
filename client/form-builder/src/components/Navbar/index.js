import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/AccountManagementPage" activeStyle>
                        Account Management
                    </NavLink>
                    <NavLink to="/Dashboard" activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to="/FormBuilder" activeStyle>
                        Form Builder
                    </NavLink>
                    <NavLink to="/Settings" activeStyle>
                        Settings
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
