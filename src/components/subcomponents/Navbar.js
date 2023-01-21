import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AddFileButton } from '../dashboard/AddFileButton';
import { baseRoute } from '../../App';

export const NavbarComponent = () => {
    const { currentUser } = useAuth();

    return <Navbar style={{ paddingLeft: "20px", paddingRight: "20px", justifyContent: "space-between"}} className="mx-10" bg="light" expand="lg">
        <Navbar.Brand>
            <Link className="text-dark text-decoration-none" to={baseRoute+"/"}>
                <h2><strong>RWPawnDex</strong></h2>
            </Link>
        </Navbar.Brand>
        <h3>Rimworld / Characters</h3>
        <Nav style={{ flexDirection: "row", columnGap: "20px"}}>
            <div id="Navbar-Nav" style={{ width: "25px" }}/>
            {currentUser && <Nav.Link as={Link} to={baseRoute+"/account"}>{currentUser.displayName}</Nav.Link>}
        </Nav>
    </Navbar>
}