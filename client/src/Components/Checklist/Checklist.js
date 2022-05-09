import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Checklist.css';

const Checklist = (props) => {

    const [categoryDetail, setCategoryDetail] = useState({});
    const [serverCategory, setServerCategory]= useState({});
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [animal, setAnimal] = useState('');
    const [thing, setThing] = useState('');



    useEffect(() => {
        axios.get('http://localhost:8080/feeds/category')
            .then(response => {

                if (JSON.stringify(categoryDetail) !== JSON.stringify(response.data.category)) {
                    if(!response.data.category){
                        return;
                    }
                    setCategoryDetail(response.data.category);
                    setName(response.data.category.Name);
                    setPlace(response.data.category.Place);
                    setAnimal(response.data.category.Animal);
                    setThing(response.data.category.Thing);
                }

                if(!props.show){
                    setName(response.data.category.Name);
                    setPlace(response.data.category.Place);
                    setAnimal(response.data.category.Animal);
                    setThing(response.data.category.Thing);
                }


            })
            .catch(err => {
                console.log(err);
            })
    })


    const onSubmitHandler = () => {
        console.log("Name: " + name + " Place: " + place + " Animal: " + animal + " Thing: " + thing);
    
        let category={
            Name: name, 
            Place: place, 
            Animal: animal, 
            Thing: thing
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
                    <div>Name</div>
                    <Form.Check aria-label="option 1" checked={name} onChange={e => setName(!name)} />

                </div>

                <div className='ListParent'>
                    <div>Place</div>
                    <Form.Check aria-label="option 1" checked={place} onChange={e => setPlace(!place)} />
                </div>

                <div className='ListParent'>
                    <div>Animal</div>
                    <Form.Check aria-label="option 1" checked={animal} onChange={e => setAnimal(!animal)} />

                </div>

                <div className='ListParent'>
                    <div>Thing</div>
                    <Form.Check aria-label="option 1" checked={thing} onChange={e => setThing(!thing)} />

                </div>



            </Form>
            <Button variant="primary" className='ListButton'
                onClick={onSubmitHandler}>Update Categories</Button>
        </div>

    )
}

export default Checklist;