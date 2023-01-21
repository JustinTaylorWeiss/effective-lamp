import { CenteredContainer } from '../subcomponents';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { baseRoute } from '../../App';

export const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth()
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setMessage(""); 
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox at " + emailRef.current.value);
        } catch (e) {
            setError(e.code);
        }
        setLoading(false);
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                { error && <Alert variant="danger">{error}</Alert>}
                { message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to={baseRoute+"/login"}>Login</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to={baseRoute+"/signup"}>Sign Up</Link>
        </div>
    </CenteredContainer>
}