import React from 'react';

const Card = (props) => {
    console.log(props)
    const{payload}=props
    return (
        <div  style={{ height: 270, paddingRight:30, float: 'left'}}>
            <div className="card">
                <div className="card-image" style={{ width: 240}}>
                    <img alt={payload.structValue.fields.header.stringValue} src={payload.structValue.fields.image.stringValue} />
                    <span className="card-title">{payload.structValue.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                    {payload.structValue.fields.description.stringValue}
                    <p> <a href="/">{payload.structValue.fields.price.stringValue}</a></p>
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={payload.structValue.fields.link.stringValue}>GET NOW</a>
                </div>
            </div>
        </div>
    );
};

export default Card;