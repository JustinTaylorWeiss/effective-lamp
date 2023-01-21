import { CenteredContainer } from '../subcomponents';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { baseRoute } from '../../App';

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate(baseRoute+"/");
        } catch (e) {
            setError(e.code);
        }
        setLoading(false);
    }

    return <CenteredContainer>
        <Card className="w-100 flex-1" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                { error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to={baseRoute+"/forgot-password"}>Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to={baseRoute+"/signup"}>Sign Up</Link>
        </div>
    </CenteredContainer>
}