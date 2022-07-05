import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, ListGroup, Button } from 'react-bootstrap';
import { FiStar } from 'react-icons/fi';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import NewSideBar from '../NewSideBar/NewSideBar';
import './Sidebar.css';
import NewNavBar from '../NewSideBar/NewSideBar';

const Sidebar = (props) => {

    let LoggedIn= localStorage.getItem('token')? true: false;

    return (
        <div className='SidebarParent'>


            {!LoggedIn?<div>
                <Link to='/login' className='SidebarLink'>
                    <Button variant="secondary" size="lg" className='SidebarButton'>
                        Login
                    </Button>
                </Link>
                <Link to='/signup' className='SidebarLink'>
                    <Button variant="outline-primary" size="lg" className='SidebarButton'>
                        Sign Up
                    </Button>
                </Link>
            </div>: null}

            <NewSideBar categoryNew={props.category} />
        </div>
    )
}

export default Sidebar;
