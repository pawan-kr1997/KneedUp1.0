import './Date.css';

const Date = (props) => {
    return (
        <div className='DateParent'>
            <div className='DateLine'></div>
            <div className='DateBody'>{props.children}</div>
            <div className='DateLine'></div>
        </div>
    )
}

export default Date;