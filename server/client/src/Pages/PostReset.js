import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Navbar, Container, Nav, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';

import './Style.css';

const PostReset = () => {

    let navigate = useNavigate();

    const [emailId, setEmailId] = useState('');
    const [error, setError] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(emailId);


        axios.post('https://kneedup.herokuapp.com/password/resetLink', { emailId })
            .then(response => {
                console.log(response);

            })
            .catch(err => {
                if (err.response.status === 500) {
                    navigate('/500');
                }
                setError(err.response.data.message);
            })



    }

    const homeHandler = () => {
        navigate('/');
    }

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect
                expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className='LogoFont'>
                        <div >Kneed</div>
                        <div className='UpFont'>Up</div>
                        <div style={{ color: "#B60000" }}>.</div>
                    </Navbar.Brand>{'  '}

                    <Nav className="me-auto">
                        <Nav.Link onClick={homeHandler} className='HomeStyle'><AiFillHome />Home</Nav.Link>
                    </Nav>

                    <Link to='/login'>
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                </Container>



            </Navbar>
            <Container>
                <Form className='SignupForm' onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            onChange={e => {
                                setEmailId(e.target.value)
                                setError(null)
                            }} />
                    </Form.Group>

                    {error && <Alert variant='danger' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <BiErrorCircle style={{ fontSize: '1em' }} />
                        {error}
                    </Alert>}



                    <Button variant="primary" type="submit">Send reset link </Button>
                </Form>
            </Container>
        </div>
    )
}

export default PostReset;