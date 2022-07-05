import './Backdrop.css';

const Backdrop= (props) =>{
    return(
        <div className='Backdrop' onClick={props.remove}></div>
    )
}

export default Backdrop;