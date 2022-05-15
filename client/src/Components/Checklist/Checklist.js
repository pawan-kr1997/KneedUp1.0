import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Checklist.css';

const Checklist = (props) => {

    const [categoryDetail, setCategoryDetail] = useState({});
    const [serverCategory, setServerCategory]= useState({});
    const [news, setNews] = useState('');
    const [president, setPresident] = useState('');
    const [niti, setNiti] = useState('');
    const [idsa, setIdsa] = useState('');
    const [pib, setPib] = useState('');
    const [prs, setPrs] = useState('');



    useEffect(() => {
        axios.get('http://localhost:8080/feeds/category')
            .then(response => {

                if (JSON.stringify(categoryDetail) !== JSON.stringify(response.data.category)) {
                    if(!response.data.category){
                        return;
                    }
                    setCategoryDetail(response.data.category);
                    setNews(response.data.category.news);
                    setPresident(response.data.category.president);
                    setNiti(response.data.category.niti);
                    setIdsa(response.data.category.idsa);
                    setPib(response.data.category.pib);
                    setPrs(response.data.category.prs);
                }

                if(!props.show){
                    setNews(response.data.category.news);
                    setPresident(response.data.category.president);
                    setNiti(response.data.category.niti);
                    setIdsa(response.data.category.idsa);
                    setPib(response.data.category.pib);
                    setPrs(response.data.category.prs);
                }


            })
            .catch(err => {
                console.log(err);
            })
    })


    const onSubmitHandler = () => { 
        //console.log("Name: " + name + " Place: " + place + " Animal: " + animal + " Thing: " + thing);
    
        let category={
            News: news, 
            President: president, 
            Niti: niti, 
            Idsa: idsa,
            Pib: pib,
            Prs: prs
        }

        

        axios.post('http://localhost:8080/feeds/category', category)
            .then(response=>{
                console.log(response);
            })
            .catch(err=>{
                console.log(err);
            })
     }




    return (
        <div className='Parent'>
            <h3 className='Text'>Select the sites for which you want to receive notification</h3>
            <Form className='Lists'>

                <div className='ListParent'>
                    <div>News on air</div>
                    <Form.Check aria-label="option 1" checked={news} onChange={e => setNews(!news)} />

                </div>

                <div className='ListParent'>
                    <div>President of India</div>
                    <Form.Check aria-label="option 1" checked={president} onChange={e => setPresident(!president)} />
                </div>

                <div className='ListParent'>
                    <div>Niti Aayog</div>
                    <Form.Check aria-label="option 1" checked={niti} onChange={e => setNiti(!niti)} />

                </div>

                <div className='ListParent'>
                    <div>Institute for Defence studies and Analysis</div>
                    <Form.Check aria-label="option 1" checked={idsa} onChange={e => setIdsa(!idsa)} />

                </div>

                <div className='ListParent'>
                    <div>Press Information Bureau</div>
                    <Form.Check aria-label="option 1" checked={pib} onChange={e => setPib(!pib)} />

                </div>
                <div className='ListParent'>
                    <div>PRS India</div>
                    <Form.Check aria-label="option 1" checked={prs} onChange={e => setPrs(!prs)} />

                </div>



            </Form>
            <Button variant="primary" className='ListButton'
                onClick={onSubmitHandler}>Update Categories</Button>
        </div>

    )
}

export default Checklist;