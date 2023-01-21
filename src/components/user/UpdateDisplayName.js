import { CenteredContainer } from '../subcomponents';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const UpdateDisplayName = () => {
    const passwordRef = useRef();
    const newDisplayNameRef = useRef();
    const { currentUser, updateDisplayName, login } = useAuth()
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            setError("");
            setMessage("");
            setLoading(true);
            await login(currentUser.email, passwordRef.current.value);
            await updateDisplayName(newDisplayNameRef.current.value);
            //await updateUserPassword(newPasswordRef.current.value)
            setMessage("Display Name Updated");
            document.getElementById("updateDisplayNameForm").reset();
        } catch (e) {
            setError(e.code);
        }
        setLoading(false);
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Update Display Name</h2>
                { error && <Alert variant="danger">{error}</Alert>}
                { message && <Alert variant="success">{message}</Alert>}
                <Form id="updateDisplayNameForm" onSubmit={handleSubmit}>
                <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="displayName">
                        <Form.Label>New Display Name</Form.Label>
                        <Form.Control type="text" ref={newDisplayNameRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Submit</Button>
                    <Link to="/account">
                        <Button className="w-100 mt-4">Back to account</Button>
                    </Link>
                </Form>
            </Card.Body>
        </Card>
    </CenteredContainer>
};