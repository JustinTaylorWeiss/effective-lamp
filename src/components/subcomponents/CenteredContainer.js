import React from "react";
import { Container } from "react-bootstrap";

export const CenteredContainer = ({ children }) => (
    <Container className="
      d-flex flex-column align-items-center
      justify-content-center"
      style={{ minHeight: "100vh"}}
    >
        { children }
    </Container>
);