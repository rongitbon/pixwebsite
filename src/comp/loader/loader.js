import React from 'react';
import "./loader.scss";
const Loader = (props) => {
    return (props.load?<div className="loader"></div>:props.children);
}

export default Loader;