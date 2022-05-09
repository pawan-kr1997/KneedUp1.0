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
            {props.category.Name?<ListGroup.Item action style={{ border: 'none' }}>Name</ListGroup.Item>: null}
            {props.category.Place?<ListGroup.Item action style={{ border: 'none' }}>Place</ListGroup.Item>: null}
            {props.category.Animal?<ListGroup.Item action style={{ border: 'none' }}>Animal</ListGroup.Item>: null}
            {props.category.Thing?<ListGroup.Item action style={{ border: 'none' }}>Thing</ListGroup.Item>: null}

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
                
            </Accordion>

            


        </div>
    )
}

export default Sidebar;
