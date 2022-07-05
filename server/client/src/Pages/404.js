import React from "react";
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect
                expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">KneedUp.</Navbar.Brand>{'  '}
                </Container>
            </Navbar>
            <div className='Content404'>
                <h1 className='Head404'>Page Not Found</h1>
                <h4>Something went wrong ,please visit again later</h4>
                <Link to='/'>
                    <Button variant="primary">Back To Home</Button>
                </Link>
            </div>
        </div>


    )
}


export default ErrorPage; 