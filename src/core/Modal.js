import React from "react";

const Modal = ({show ,children}) => {
    if(!show) {
        return null;
      }
      return (
      <div className="modal" >
          <div className="model-inner">
          {children}
          </div>
    </div>)
       
      
};

export default Modal;