import { Col, Container, Row, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import NavBar from '../Components/NavBar/NavBar';
import OffCanvas from '../Components/OffCanvas/OffCanvas';
import Modal from '../Components/UI/Modal/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdShare } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { MdDateRange } from 'react-icons/md';
import axios from 'axios';
import './Style.css';



const Bookmark = () => {

    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const [bookmark, setBookmark] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8080/bookmark')
            .then(response => {
                //console.log(response.data.bookmark);
                if (JSON.stringify(bookmark) !== JSON.stringify(response.data.bookmark)) {

                    setBookmark(response.data.bookmark);
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
        axios.get("http://localhost:8080/postUnmark/" + postId)
            .then(result => {
                console.log(result.data.user.bookmark);
                setBookmark(result.data.user.bookmark);
            })
            .catch(err => {
                console.log(err);
            })
    }


    let orderedBookmark= [...bookmark].reverse();

    const bookmarkArray = orderedBookmark.map(post => {

        let postUrl="https://"+post.url;
        
        let myDate = new Date(post.date);
        let postDate = myDate.getDate();
        let postMonth = myDate.getMonth();
        let postYear = myDate.getFullYear();
        let date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
        let shortMonth = date.toLocaleString('en-us', { month: 'short' });

        let finalDate= postDate+' '+ shortMonth+' '+postYear;


        return (
            <Card className='BookmarkContainer' key={post.id}>
                <Card.Body>
                    <div className='BookmarkTop'>
                        <p>{post.category}</p>
                        <p className='BookmarkTopDate'>Added on {finalDate}</p>
                    </div>

                    <Card.Title><a href={postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='BookmarkText'>
                        {post.title}
                    </a></Card.Title>
                    <div className='BookmarkIconContainer'>
                        <RiDeleteBin6Line className='BookmarkIcon' onClick={() => unBookmarkHandler(post.id)}/>
                        <MdShare className='BookmarkIcon' onClick={() => {navigator.clipboard.writeText(postUrl)}} />
                    </div>

                </Card.Body>
            </Card>
        )
    })




    return (
        <div>
            <NavBar />
            <OffCanvas showHandler={showModalHandler} />

            <Container>
                <Row>
                    <Col>
                        {bookmarkArray}
                        <div className='BookmarkFooter'>fdfdfdffffdffdfdffdfdfdfdddddddddddddddddddddd</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Bookmark; 