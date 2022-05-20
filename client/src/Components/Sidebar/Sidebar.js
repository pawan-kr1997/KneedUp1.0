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
            
 
            <Accordion defaultActiveKey="0">
            {props.category.news?<Accordion.Item eventKey="0">
                    <Accordion.Header>News on air</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/newsOnAir_National' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>
                                National
                                </ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_International' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>
                                International
                                </ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_Business' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>
                                Business
                                </ListGroup.Item>
                            </Link>

                            <Link to='/newsOnAir_Sports' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>
                                Sports
                                </ListGroup.Item>
                            </Link>

                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>: null}

                {props.category.president?<Accordion.Item eventKey="1" style={{border:'0px 0px 0px 1px'}}>
                    <Accordion.Header>President Of India</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/poi_Speeches' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Speeches</ListGroup.Item>
                            </Link>

                            <Link to='/poi_pressReleases' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Press releases</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>: null}


                {props.category.niti?<Accordion.Item eventKey="2" style={{border:'0px 0px 0px 1px'}}>
                    <Accordion.Header>Niti Aayog</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/nitiAayog_nitiBlogs' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Niti blogs</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>:null}


                {props.category.idsa?<Accordion.Item eventKey="3" style={{border:'0px 0px 0px 1px'}}>
                    <Accordion.Header>Institute for Defence Studies and Analysis</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">

                            <Link to='/idsa_commentsAndBriefs' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Comments and briefs</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>: null}

                
                {props.category.pib?<Accordion.Item eventKey="4" style={{border:'0px 0px 0px 1px'}}>
                    <Accordion.Header>Press Information Bureau</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            <Link to='/pib_pressReleases' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Press releases</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>: null}
                
                
                {props.category.prs?<Accordion.Item eventKey="5" style={{border:'0px 0px 0px 1px'}}>
                    <Accordion.Header>PRS India</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            <Link to='/prs_Blogs' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Blogs</ListGroup.Item>
                            </Link>

                            <Link to='/prs_Articles' className='SidebarLink'>
                                <ListGroup.Item className='SidebarList' action>Articles</ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>: null}

            </Accordion>




        </div>
    )
}

export default Sidebar;
