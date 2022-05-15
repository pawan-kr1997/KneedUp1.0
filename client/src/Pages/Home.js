import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../Components/NavBar/NavBar';
import OffCanvas from '../Components/OffCanvas/OffCanvas';
import Feeds from '../Components/Feeds/Feeds';
import Sidebar from '../Components/Sidebar/Sidebar';
import Modal from '../Components/UI/Modal/Modal';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';


const Home = () => {

    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const [categoryDetail, setCategoryDetail] = useState({});



    useEffect(() => {
        axios.get('http://localhost:8080/feeds/category')
            .then(response => {

                if (JSON.stringify(categoryDetail) !== JSON.stringify(response.data.category)) {

                    setCategoryDetail(response.data.category);
                }

            })
            .catch(err => {
                console.log(err);
            })
    })


    const showModalHandler = () => {
        localStorage.getItem('token') ? setShowModal(true) : navigate('/login')

    }

    const removeModalHandler = () => {
        setShowModal(false);
    }

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <NavBar />
            <OffCanvas showHandler={showModalHandler} />
            <Modal show={showModal}
                removeHandler={removeModalHandler}
                category={categoryDetail} />



            <div className='HomeParent'>

                <div className='HomeCol1'>
                    <Sidebar showHandler={showModalHandler} category={categoryDetail} />
                </div>
                <div className='HomeCol2'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Home; 