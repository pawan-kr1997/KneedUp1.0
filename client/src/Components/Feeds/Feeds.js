import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsBookmarks } from 'react-icons/bs';
import { MdShare } from 'react-icons/md';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import DateComp from '../Date/Date';
import './Feeds.css';


const Feeds = () => {
    let params = useParams();
    let paramsCategory = '';
    let navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    switch (params.category) {
        case 'newsOnAir_National':
            paramsCategory = 'national';
            break;
        case 'newsOnAir_International':
            paramsCategory = 'international';
            break;
        case 'newsOnAir_Business':
            paramsCategory = 'business';
            break;
        case 'newsOnAir_Sports':
            paramsCategory = 'sports';
            break;
        case 'poi_Speeches':
            paramsCategory = 'speeches';
            break;
        case 'poi_pressReleases':
            paramsCategory = 'pressReleases';
            break;
        case 'nitiAayog_nitiBlogs':
            paramsCategory = 'nitiBlogs';
            break;
        case 'idsa_commentsAndBriefs':
            paramsCategory = 'commentsAndBriefs';
            break;
        case 'pib_pressReleases':
            paramsCategory = 'pressReleases';
            break;
        case 'prs_Blogs':
            paramsCategory = 'blogs';
            break;
        case 'prs_Articles':
            paramsCategory = 'articles';
            break;
        default:
            paramsCategory = '';
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
        navigate('/404');
    }








    useEffect(() => {
        axios.get(url)
            .then(response => {

                if (JSON.stringify(posts) !== JSON.stringify(response.data.posts)) {

                    setPosts(response.data.posts);
                }

            })
            .catch(err => {
                console.log(err);
            })
    })

    let reversePosts = [...posts].reverse();
    console.log(reversePosts);

    let currentDate = '';
    let currentDateStatus = false;

    let cardArray = reversePosts.map(post => {
        let contentURL = "https://" + post.url;

        let myDate = new Date(post.createdAt);
        let postDate = myDate.getDate();
        let postMonth = myDate.getMonth();
        let postYear = myDate.getFullYear();
        //let dateInParts = tempDate.toISOString().split("T");


        let date = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
        let shortMonth = date.toLocaleString('en-us', { month: 'short' });
        //let dateTimeInParts = myDate.getDate() + " " + shortMonth + " " + myDate.getFullYear();
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
        else{
            currentDateStatus= false;
        }


        return (
            <div>
                {currentDateStatus ? <DateComp>{dateTimeInParts}</DateComp> : null}
                <Card key={post._id}>
                    <Card.Body>
                        <Card.Title><a href={contentURL}
                            target="_blank"
                            rel="noopener noreferrer">
                            {post.title}
                        </a></Card.Title>
                        <div className='IconContainer'>
                            <BsBookmarks className='Icon' />
                            <MdShare className='Icon' />
                        </div>
                    </Card.Body>
                </Card>
            </div>

        )
    })




    return (
        <div className='FeedsContainer'>

            <p>{paramsCategory}</p>

            {cardArray}

        </div>
    )
}

export default Feeds;