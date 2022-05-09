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
    const [error, setError] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(emailId);
        console.log(password);
        axios.post('http://localhost:8080/login',{emailId, password})
            .then(response=>{
                console.log(response);
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = response.data.token;
                navigate('/');
            })
            .catch(err=>{
                console.log(err.response.data.message);
                if(err.response.status === 500){
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

                    {error && <Alert variant='danger' style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <BiErrorCircle style={{ fontSize: '1em' }} />
                        {error}
                    </Alert>}



                    <Button variant="primary" type="submit"> Submit </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;