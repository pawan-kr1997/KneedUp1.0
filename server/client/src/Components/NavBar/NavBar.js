import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';

import './NavBar.css';

const NavbarMain = () => {
    let navigate = useNavigate();
    

    const bookmarkHandler= () =>{
        if(localStorage.getItem('token')){
            navigate('/bookmark');
        }
        else{
            navigate('/login');
        }
    }

    const aboutHandler=()=>{
        navigate('/about');
    }

    const homeHandler= () =>{
        navigate('/');
    }

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect
                expand="lg" bg="dark" variant="dark" className='ShowNav'>
                <Container>
                    <Navbar.Brand className='LogoFont'>
                    <div >Kneed</div>
                    <div className='UpFont'>Up</div>
                    <div style={{color:"#B60000"}}>.</div>
                    </Navbar.Brand>{'  '}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">


                        <Nav className="me-auto">
                            
                            <Nav.Link onClick={homeHandler} className='HomeStyle'><AiFillHome/>Home</Nav.Link>
                            
                        </Nav>



                        {!localStorage.getItem('token') ? <Nav style={{display:'flex', flexDirection:'Row', gap:'5px'}}>
                            <Link to='/login'>
                                <Button variant="primary" style={{width:'100px'}}>Login</Button>
                            </Link>

                            <Link to='/signup'>
                                <Button variant="outline-secondary" style={{width:'100px'}}>Sign Up</Button>
                            </Link>

                        </Nav> :
                            <Nav>
                                <Link to='/'>
                                    <Button variant="outline-primary"
                                        onClick={() => {
                                            localStorage.removeItem('token')
                                            axios.defaults.headers.common['Authorization'] = null
                                        }}>Log Out</Button>
                                </Link>

                            </Nav>}
                    </Navbar.Collapse>


                </Container>
            </Navbar>



        </div>


    )
}

export default NavbarMain;