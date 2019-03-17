import React from 'react';
import "./h-secondary.scss";

const Hsecondary = (props) => {
    return (
        <div className={"h-secondary " + props.color}>{props.text}</div>
    );
}

export default Hsecondary;