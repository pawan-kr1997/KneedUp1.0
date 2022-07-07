import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CategorySideBar from '../CategorySideBar/CategorySideBar';

import './Sidebar.css';

const Sidebar = (props) => {

    let LoggedIn = localStorage.getItem('token') ? true : false;

    return (
        <div className='SidebarParent'>
            {!LoggedIn ? <div>
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
            </div> : null}

            <CategorySideBar categoryNew={props.category} />
        </div>
    )
}

export default Sidebar;
