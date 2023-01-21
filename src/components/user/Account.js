import { CenteredContainer } from '../subcomponents';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export const Account = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setError("");
        try {
            await logout()
            navigate("/login");
        } catch (e) {
            console.log(e);
            setError("Failed to log out");
        }
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body className="
            d-flex flex-column 
            align-items-center
            justify-content-center
            w-100">
                <h2 className="text-center mb-3">{currentUser.displayName}</h2>
                <h4 className="text-center mb-3">{currentUser.email}</h4>
                <Link className="w-100 mt-3" to="/update-display-name">
                    <Button className="w-100" style={{ minWidth: "90px" }}>Update Display Name</Button>
                </Link>
                <Link className="w-100 mt-3" to="/update-password">
                    <Button className="w-100" style={{ minWidth: "90px" }}>Update Password</Button>
                </Link>
                <Link className="w-100 mt-3" to="/">
                    <Button className="w-100" style={{ minWidth: "90px" }}>Back to dashboard</Button>
                </Link>
                <Button className="btn-danger w-100 mt-3" onClick={handleLogout} style={{ minWidth: "90px" }}>Log Out</Button>
                { error && <Alert variant="danger">{error}</Alert>}
            </Card.Body>
        </Card>
    </CenteredContainer>
}