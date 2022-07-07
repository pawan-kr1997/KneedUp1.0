import { Col, Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdShare } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import NavBar from '../Components/NavBar/NavBar';
import OffCanvas from '../Components/OffCanvas/OffCanvas';

import './Style.css';
import 'react-toastify/dist/ReactToastify.css';


const Bookmark = () => {

    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const [bookmark, setBookmark] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState({});

    //Logic to get bookmarked posts of logged in user
    useEffect(() => {
        axios.get('https://kneedup.herokuapp.com/bookmark')
            .then(response => {

                if (JSON.stringify(bookmark) !== JSON.stringify(response.data.bookmark)) {

                    setBookmark(response.data.bookmark);
                }

            })
            .catch(err => {
                console.log(err);
            })
    })

    //Logic to set category for offcanvas 
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


    const showModalHandler = () => {
        localStorage.getItem('token') ? setShowModal(true) : navigate('/login')

    }

    const removeModalHandler = () => {
        setShowModal(false);
    }

    const unBookmarkHandler = (postId) => {
        toast("Post removed from bookmark");

        axios.get("https://kneedup.herokuapp.com/postUnmark/" + postId)
            .then(result => {
                console.log(result.data.user.bookmark);
                setBookmark(result.data.user.bookmark);
            })
            .catch(err => {
                console.log(err);
            })
    }


    let orderedBookmark = [...bookmark].reverse();

    const bookmarkArray = orderedBookmark.map(post => {

        let postUrl = "https://" + post.url;

        let myDate = new Date(post.date);
        let postDate = myDate.getDate();
        let postMonth = myDate.getMonth();
        let postYear = myDate.getFullYear();
        let date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
        let shortMonth = date.toLocaleString('en-us', { month: 'short' });

        let finalDate = postDate + ' ' + shortMonth + ' ' + postYear;


        return (
            <Card className='BookmarkContainer' key={post.id}>
                <Card.Body>
                    <div className='BookmarkTop'>
                        <p>{post.category}</p>
                        <p className='BookmarkTopDate'>Added on {finalDate}</p>
                    </div>

                    <Card.Title>
                        <a href={postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='BookmarkText'>
                            {post.title}
                        </a>
                    </Card.Title>
                    <div className='BookmarkIconContainer'>
                        <RiDeleteBin6Line className='BookmarkIcon' onClick={() => unBookmarkHandler(post.id)} />
                        <MdShare className='BookmarkIcon' onClick={() => {
                            navigator.clipboard.writeText(postUrl)
                            toast("Post URL copied")
                        }} />
                    </div>

                </Card.Body>
            </Card>
        )
    })




    return (
        <div>
            <NavBar />
            <OffCanvas showFollowSite={false} showHandler={showModalHandler} category={categoryDetail} />

            <Container>
                <Row>
                    <Col>
                        <div style={{ height: "70px" }}></div>
                        {bookmarkArray}
                        <div className='BookmarkFooter'>fdfdfdffffdffdfdffdfdfdfdddddddddddddddddddddd</div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </div>
    )
}

export default Bookmark; 