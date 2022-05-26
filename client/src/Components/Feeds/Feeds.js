import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { BsBookmarks } from 'react-icons/bs';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { MdShare } from 'react-icons/md';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import DateComp from '../Date/Date';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Feeds.css';


const Feeds = () => {
    let params = useParams();
    let paramsCategory = '';
    var headerText = " ";
    let navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarkData, setBookmarkData] = useState([{ id: '1', date: 'sasas' }]);

    switch (params.category) {
        case 'newsOnAir_National':
            paramsCategory = 'national';
            headerText = 'News On Air / National news'; 
            break;
        case 'newsOnAir_International':
            paramsCategory = 'international';
            headerText = 'News On Air / International news';
            break;
        case 'newsOnAir_Business':
            paramsCategory = 'business';
            headerText = 'News On Air / Business news';
            break;
        case 'newsOnAir_Sports':
            paramsCategory = 'sports';
            headerText = 'News On Air / Sports news';
            break;
        case 'poi_Speeches':
            paramsCategory = 'speeches';
            headerText = 'President of India / Speeches';
            break;
        case 'poi_pressReleases':
            paramsCategory = 'pressReleases';
            headerText = 'President of India / Press releases';
            break;
        case 'nitiAayog_nitiBlogs':
            paramsCategory = 'nitiBlogs';
            headerText = 'Niti Aayog / Niti blogs';
            break;
        case 'idsa_commentsAndBriefs':
            paramsCategory = 'commentsAndBriefs';
            headerText = 'Institute of Defence Studies and Analysis / Comments and Briefs';
            break;
        case 'pib_pressReleases':
            paramsCategory = 'pressReleases';
            headerText = 'Press Information Bureau / Press releases';
            break;
        case 'prs_Blogs':
            paramsCategory = 'blogs';
            headerText = 'PRS India / Blogs';
            break;
        case 'prs_Articles':
            paramsCategory = 'articles';
            headerText = 'PRS India / Articles';
            break;
        default:
            paramsCategory = 'abc';
    }


    let url = "http://localhost:8080/newsOnAir/" + paramsCategory;

    if (params.category === 'newsOnAir_National' || params.category === 'newsOnAir_International' || params.category === 'newsOnAir_Sports' || params.category === 'newsOnAir_Business') {
        url = "http://localhost:8080/newsOnAir/" + paramsCategory;
    }
    else if (params.category === 'poi_Speeches' || params.category === 'poi_pressReleases') {
        url = "http://localhost:8080/presidentOfIndia/" + paramsCategory;
    }
    else if (params.category === 'nitiAayog_nitiBlogs') {
        url = "http://localhost:8080/nitiAayog/" + paramsCategory;
    }
    else if (params.category === 'idsa_commentsAndBriefs') {
        url = "http://localhost:8080/idsa/" + paramsCategory;
    }
    else if (params.category === 'pib_pressReleases') {
        url = "http://localhost:8080/pressInformationBureau/" + paramsCategory;
    }
    else if (params.category === 'prs_Blogs' || params.category === 'prs_Articles') {
        url = "http://localhost:8080/prsIndia/" + paramsCategory;
    }
    else {
        console.log("Hello ji");

    }


    useEffect(() => {
        
            //setLoading(true);
        
        
        axios.get(url)
            .then(response => {

                if (JSON.stringify(posts) !== JSON.stringify(response.data.posts)) {
                    setLoading(true);
                    setPosts(response.data.posts);
                }
                else{
                    setLoading(false);
                }

            })
            .catch(err => {
                console.log(err);
            })
    })

   

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get('http://localhost:8080/bookmark/init')
                .then(response => {

                    if (JSON.stringify(bookmarkData) !== JSON.stringify(response.data.data)) {

                        setBookmarkData(response.data.data);
                    }
                    //console.log(response.data.data);

                })
                .catch(err => {
                    console.log(err);
                })
        }
    })


    const bookmarkHandler = (postId) => {
        const token = localStorage.getItem('token');
        toast("Post added to bookmark");
        if (!token) {
            navigate('/login');
        }

        axios.get("http://localhost:8080/postBookmark/" + postId)
            .then(result => {
                console.log(result.data.user.bookmark);
                setBookmarkData(result.data.user.bookmark);

            })
            .catch(err => {
                console.log(err);
            })
    }

    const unBookmarkHandler = (postId) => {
        toast("Post removed from bookmark");
        axios.get("http://localhost:8080/postUnmark/" + postId)
            .then(result => {
                console.log(result.data.user.bookmark);
                setBookmarkData(result.data.user.bookmark);
            })
            .catch(err => {
                console.log(err);
            })
    }

    let reversePosts = [...posts].reverse();
    let currentDate = '';
    let currentDateStatus = false;

    let cardArray = reversePosts.map(post => {
        let contentURL = "https://" + post.url;

        let myDate = new Date(post.createdAt);
        let postDate = myDate.getDate();
        let postMonth = myDate.getMonth();
        let postYear = myDate.getFullYear();



        let date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
        let shortMonth = date.toLocaleString('en-us', { month: 'short' });
        let dateTimeInParts = " ";

        let tempDate = new Date();
        let currDate = tempDate.getDate();
        let currMonth = tempDate.getMonth();
        let currYear = tempDate.getFullYear();

        if (postDate === currDate && postMonth === currMonth && postYear === currYear) {
            dateTimeInParts = 'Today';
        }
        else if (postDate === +currDate - 1 && postMonth === currMonth && postYear === currYear) {
            dateTimeInParts = 'Yesterday';
        }
        else {
            dateTimeInParts = myDate.getDate() + " " + shortMonth + " " + myDate.getFullYear();
        }

        if (currentDate !== postDate + " " + postMonth + " " + postYear) {
            currentDateStatus = true;
            currentDate = postDate + " " + postMonth + " " + postYear;
        }
        else {
            currentDateStatus = false;
        }

        let bookmarkStatus = <BsBookmarks className='Icon'
            onClick={() => bookmarkHandler(post._id)} />;

        for (let i = 0; i < bookmarkData.length; i++) {

            if (bookmarkData[i].id.toString() === post._id.toString()) {
                bookmarkStatus = <BsFillBookmarksFill className='Icon'
                    style={{ color: '#1a73e8' }}
                    onClick={() => unBookmarkHandler(post._id)} />;
                break;
            }
        }




        return (
            <div>
                {currentDateStatus ? <DateComp>
                    {dateTimeInParts}
                </DateComp> : null}
                <Card key={post._id}>
                    <Card.Body>
                        <Card.Title><a href={contentURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='Text'>
                            {post.title}
                        </a></Card.Title>
                        <div className='IconContainer'>
                            {bookmarkStatus}

                            <MdShare className='Icon' onClick={() => {
                                navigator.clipboard.writeText(contentURL)
                                toast("Post URL copied");
                            }} />
                        </div>
                    </Card.Body>
                </Card>
            </div>

        )
    })


    const finalArr=<div>
    <p><h1>{headerText}</h1></p>
    {cardArray}
    </div> 

    let spinner= <Spinner animation="border" variant="primary" />

    


    return (
        <div className='FeedsContainer'>
        
        <p><h1>{headerText}</h1></p>
            {loading?<Spinner animation="border" variant="primary" />:cardArray}
                  <Card className='Last'>
                <Card.Body>
                    <Card.Title>
                        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    </Card.Title>
                </Card.Body>
            </Card>
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

export default Feeds;






// {!post.bookmarked ?
//     <BsBookmarks className='Icon'
//         onClick={() => bookmarkHandler(post._id)} />
//     :
//     <BsFillBookmarksFill className='Icon'
//         style={{ color: '#1a73e8' }}
//         onClick={() => unBookmarkHandler(post._id)} />}