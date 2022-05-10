import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, ListGroup, Button } from 'react-bootstrap';
import { FiStar } from 'react-icons/fi';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import './Sidebar.css';

const Sidebar = (props) => {
    return (
        <div className='SidebarParent'>
            <Button variant="outline-primary"
                className='SidebarButton' onClick={props.showHandler}>
                <FiStar />
                Follow Sites
            </Button>
            {props.category.Name ? <ListGroup.Item action style={{ border: 'none' }}>Name</ListGroup.Item> : null}
            {props.category.Place ? <ListGroup.Item action style={{ border: 'none' }}>Place</ListGroup.Item> : null}
            {props.category.Animal ? <ListGroup.Item action style={{ border: 'none' }}>Animal</ListGroup.Item> : null}
            {props.category.Thing ? <ListGroup.Item action style={{ border: 'none' }}>Thing</ListGroup.Item> : null}

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>News on air</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/newsOnAir_National'>
                                <ListGroup.Item action>National</ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_International'>
                                <ListGroup.Item action>International</ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_Business'>
                                <ListGroup.Item action>Business</ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_Sports'>
                                <ListGroup.Item action>Sports</ListGroup.Item>
                            </Link>

                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>President Of India</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/poi_Speeches'>
                                <ListGroup.Item action>Speeches</ListGroup.Item>
                            </Link>

                            <Link to='/poi_pressReleases'>
                                <ListGroup.Item action>Press releases</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="2">
                    <Accordion.Header>Niti Aayog</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/nitiAayog_nitiBlogs'>
                                <ListGroup.Item action>Niti blogs</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>Institute for Defence Studies and Analysis</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/idsa_commentsAndBriefs'>
                                <ListGroup.Item action>Comments and briefs</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>

                
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Press Information Bureau</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            <Link to='/pib_pressReleases'>
                                <ListGroup.Item action>Press releases</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                
                
                <Accordion.Item eventKey="5">
                    <Accordion.Header>PRS India</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            <Link to='/prs_Blogs'>
                                <ListGroup.Item action>Blogs</ListGroup.Item>
                            </Link>

                            <Link to='/prs_Articles'>
                                <ListGroup.Item action>Articles</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>




        </div>
    )
}

export default Sidebar;
