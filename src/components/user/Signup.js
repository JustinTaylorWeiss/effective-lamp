import { CenteredContainer } from '../subcomponents';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const Signup = () => {
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, verifyEmail, logout, updateDisplayName } = useAuth()
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            await updateDisplayName(displayNameRef.current.value);
            await verifyEmail();
            setMessage("Email verification sent to " + emailRef.current.value);
            await logout();
            document.getElementById("signupForm").reset();
        } catch (e) {
            setError(e.code);
        }
        setLoading(false);
        
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                { error && <Alert variant="danger">{error}</Alert>}
                { message && <Alert variant="success">{message}</Alert>}
                <Form id="signupForm" onSubmit={handleSubmit}>
                    <Form.Group id="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" ref={displayNameRef} required/>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </CenteredContainer>
};