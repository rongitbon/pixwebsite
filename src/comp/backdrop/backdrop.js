import React from 'react';
import './backdrop.scss';

const Backdrop = (props) => {
    return (
        props.show ? <div className="backdrop" style={{zIndex: props.zindex?props.zindex:1000}} onClick={props.clicked}>{props.children}</div> : null
    );
};

export default Backdrop;