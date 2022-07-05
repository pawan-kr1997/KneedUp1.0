import React from 'react';
import { Nav } from 'react-bootstrap';
import { BsPeople } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import Sidebar from '../Components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import OffCanvas from '../Components/OffCanvas/OffCanvas';
import Modal from '../Components/UI/Modal/Modal';
import axios from 'axios';

const Home = () => {

    let loggedIn = localStorage.getItem('token') ? true : false;

    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const [categoryDetail, setCategoryDetail] = useState({});

    useEffect(() => {
        axios.get('https://kneedup.herokuapp.com/feeds/category')
            .then(response => {

                if (JSON.stringify(categoryDetail) !== JSON.stringify(response.data.category)) {

                    setCategoryDetail(response.data.category);

                }

            })
            .catch(err => {
                console.log(err);
            })
    })


    useEffect(() => {
        if (!loggedIn) {
            navigate('/newsOnAir_National')
        }
        else {
            if (categoryDetail.news) {
                navigate('/newsOnAir_National');
            }
            else if (categoryDetail.president) {
                navigate('/poi_Speeches');
            }
            else if (categoryDetail.niti) {
                navigate('/nitiAayog_nitiBlogs');
            }
            else if (categoryDetail.pib) {
                navigate('/pib_pressReleases');
            }
            else if (categoryDetail.prs) {
                navigate('/prs_Blogs');
            }
            else if (categoryDetail.idsa) {
                navigate('/idsa_commentsAndBriefs');
            }

        }

    }, [categoryDetail])


    const showModalHandler = () => {
        localStorage.getItem('token') ? setShowModal(true) : navigate('/login')

    }

    const removeModalHandler = () => {
        setShowModal(false);
    }

    const bookmarkHandler = () => {
        if (localStorage.getItem('token')) {
            navigate('/bookmark');
        }
        else {
            navigate('/login');
        }
    }

    const aboutHandler = () => {
        navigate('/about');
    }






    return (
        <div className='MainParentNewHome'>
            <Nav className='NavNewHome'>
                <div style={{ color: 'white' }}>Kneed</div>
                <div className='UpFont'>Up</div>
                <div style={{ color: "#B60000" }}>.</div>
            </Nav>

            <OffCanvas showFollowSite={true} showHandler={showModalHandler} category={categoryDetail} />
            <Modal show={showModal}
                removeHandler={removeModalHandler}
                category={categoryDetail} />

            <div className='ChildParent'>
                <div className='DivOne'>
                    <div className='IconNewHome' data-tooltip="About us">
                        <BsPeople className='InsideIcon' onClick={aboutHandler} />
                    </div>
                    <div className='IconNewHome' data-tooltip="Bookmarks">
                        <BsBookmark className='InsideIcon' onClick={bookmarkHandler} />
                    </div>
                    <div className='IconNewHome' data-tooltip="Follow sites">
                        <BsStar className='InsideIcon' onClick={showModalHandler} />
                    </div>

                    {loggedIn?<div className='IconNewHome' style={{ borderTop:'3px solid lightgray', paddingTop:"50px"}} data-tooltip="Logout">
                        <IoIosLogOut className='InsideIcon' onClick={() => {
                            navigate('/newsOnAir_National'); 
                            localStorage.removeItem('token');
                            axios.defaults.headers.common['Authorization'] = null;
                            
                        }} />
                    </div>:
                    null}


                </div>


                <div className='DivTwo'>
                    <Outlet />
                </div>


                <div className='DivThree'>
                    <Sidebar showHandler={showModalHandler} category={categoryDetail} />
                </div>

            </div>
        </div>
    )
}

export default Home;