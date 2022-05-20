import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Navbar, Container, Nav, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';

import './Style.css';

const Login = () => {

    let navigate = useNavigate();

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [timerId, setTimerId] = useState(null);
    const [error, setError] = useState(null);


    const removeTokenHandler = () => {
        console.log("Hello from removeTokenHandler " + localStorage.getItem('token'));
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/');
    }




    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(emailId);
        console.log(password);
        axios.post('http://localhost:8080/login', { emailId, password })
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = response.data.token;

                if (JSON.stringify(localStorage.getItem('oldToken')) !== JSON.stringify(localStorage.getItem('token'))) {

                    localStorage.setItem('oldToken', localStorage.getItem('token'));
                    clearTimeout(localStorage.getItem('timerId'));
                    const myTimeout = setTimeout(removeTokenHandler, 3600000); 
                    localStorage.setItem('timerId', myTimeout);
                }



                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data.message);
                if (err.response.status === 500) {
                    navigate('/500');
                }

                setError(err.response.data.message);

            })


    }


    return (
        <div>
            <Navbar fixed="top" collapseOnSelect
                expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">KneedUp.</Navbar.Brand>{'  '}
                    <Link to='/signup'>
                        <Button variant="outline-primary">SignUp</Button>
                    </Link>
                </Container>



            </Navbar>
            <Container>
                <Form className='LoginForm' onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            onChange={e => {
                                setEmailId(e.target.value)
                                setError(null)
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter password"
                            onChange={e => {
                                setPassword(e.target.value)
                                setError(null)
                            }} />
                    </Form.Group>
                    <div className='LoginReset'>
                        <Link to='/reset' className='LoginResetPos'>
                            <a>Forgot password ?</a>
                        </Link>

                        {error && <Alert variant='danger' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <BiErrorCircle style={{ fontSize: '1em' }} />
                            {error}
                        </Alert>}



                        <Button variant="primary" type="submit" className='LoginButton'> Submit </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Login;