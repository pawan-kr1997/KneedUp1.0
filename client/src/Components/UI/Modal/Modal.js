import { useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Checklist from '../../Checklist/Checklist';
import './Modal.css';

const Modal=(props)=>{

    let visibleState='';

    if(props.show){
        visibleState=''
    }
    else{
        visibleState='Visible'
    }

    return(
        <div className={visibleState}>
            <Backdrop remove={props.removeHandler}/>
            <div className='Modal'><Checklist category={props.category} show={props.show}/></div>
        
        </div>
    )
}

export default Modal;