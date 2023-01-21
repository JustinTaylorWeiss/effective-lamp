import { CenteredContainer } from '../subcomponents';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const UpdatePassword = () => {
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const { currentUser, updateUserPassword, login } = useAuth()
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            setError("");
            setMessage("");
            setLoading(true);
            await login(currentUser.email, oldPasswordRef.current.value);
            await updateUserPassword(newPasswordRef.current.value)
            setMessage("Password Updated");
            document.getElementById("updatePasswordForm").reset();
        } catch (e) {
            setError(e.code);
        }
        setLoading(false);
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Update Password</h2>
                { error && <Alert variant="danger">{error}</Alert>}
                { message && <Alert variant="success">{message}</Alert>}
                <Form id="updatePasswordForm" onSubmit={handleSubmit}>
                <Form.Group id="password">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" ref={oldPasswordRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" ref={newPasswordRef} required/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" ref={newPasswordConfirmRef} required/>
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