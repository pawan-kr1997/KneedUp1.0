import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsBookmarks } from 'react-icons/bs';
import { MdShare } from 'react-icons/md';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Date from '../Date/Date';
import './Feeds.css';


const Feeds = () => {
    let params = useParams();
    let paramsCategory = '';
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
        default:
            paramsCategory = '';
    }


    let url = "http://localhost:8080/newsOnAir/" + paramsCategory;


    useEffect(() => {
        axios.get(url)
            .then(response => {

                if (JSON.stringify(posts) !== JSON.stringify(response.data.posts)) {

                    setPosts(response.data.posts);
                }

                //console.log(posts);

            })
            .catch(err => {
                console.log(err);
            })
    })

    let reversePosts = [...posts].reverse();
    console.log(reversePosts);

    let cardArray = reversePosts.map(post => {
        let contentURL = "https://" + post.url;

        return (
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

        )
    })




    return (
        <div className='FeedsContainer'>

            <p>{paramsCategory}</p>
            <Date />
            {cardArray}

        </div>
    )
}

export default Feeds;