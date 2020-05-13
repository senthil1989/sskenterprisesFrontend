import React, { useState } from "react";
import { API } from "../config";
const src = 'https://images-na.ssl-images-amazon.com/images/I/61gQ5dO4b1L._SL1200_.jpg'
const ZoomImage = ({ item, url }) => {
    const src = `https://images-na.ssl-images-amazon.com/images/I/61gQ5dO4b1L._SL1200_.jpg`
    const [imgState, setImgState]=useState({ backgroundImage: `url(${src})` ,
    backgroundPosition: '0% 0%'})
    const [showZoomImage, setZoomImage]=useState(false)
    console.log(item,url);
   const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        setImgState({ ...imgState, backgroundPosition: `${x}% ${y}%` })
        
      }
    const handleMouseOver =()=>{
        setZoomImage(!showZoomImage)
    }
    const handleonMouseLeave =()=>{
        setZoomImage(false)
    }
   return( 
       <>
   <figure className="product-img" onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} onMouseLeave={handleonMouseLeave} style={{ width: '200px'}} >
        <img
            src={src}
            alt={item.name}
        />
    </figure>
    <figure className={`product-img-zoom ${showZoomImage?'zoomImg-block':'zoomImg-none'}`}  style={imgState}>

    </figure>
    </>)
   
};

export default ZoomImage;