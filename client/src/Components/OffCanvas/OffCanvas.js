import React from 'react';
import { BiBookmarks } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import axios from 'axios';
import { Navbar, Offcanvas, Nav, Container, Accordion, ListGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './OffCanvas.css';

const OffCanvas = (props) => {

    let navigate = useNavigate();
    let LoggedIn = localStorage.getItem('token');

    return (
        <Navbar bg="dark" variant="dark" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">KneedUp.</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">KneedUp.</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <ListGroup.Item action className='OffcanvasList'>
                            <MdOutlinePeopleAlt />
                            About Us
                        </ListGroup.Item>
                        <ListGroup.Item action className='OffcanvasList'>
                            <BiBookmarks />
                            Bookmarks
                        </ListGroup.Item>
                        <ListGroup.Item action className='OffcanvasList' onClick={props.showHandler}>
                            <BiStar />
                            Follow Sites
                        </ListGroup.Item>


                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>News</Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup variant="flush">

                                            <ListGroup.Item action>National</ListGroup.Item>
                                            <ListGroup.Item action>International</ListGroup.Item>
                                            <ListGroup.Item action>Sports</ListGroup.Item>


                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>News</Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup variant="flush">

                                            <ListGroup.Item action>National</ListGroup.Item>
                                            <ListGroup.Item action>International</ListGroup.Item>
                                            <ListGroup.Item action>Sports</ListGroup.Item>


                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            {!LoggedIn ?
                                <div>
                                    <Link to='/login'>
                                        <Button variant="primary" size="lg" style={{ margin: '5px 0px', width: '100%' }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to='/signup'>
                                        <Button variant="outline-secondary" size="lg" style={{ width: '100%' }}>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div> :

                                <Button variant="primary" size="lg"
                                    style={{ margin: '5px 0px', width: '100%' }}
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        axios.defaults.headers.common['Authorization'] = null;
                                        navigate('/');
                                    }}>

                                    Logout

                                </Button>
                            }


                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}


export default OffCanvas;