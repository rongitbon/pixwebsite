import React from 'react';
import './btn-link.scss';

const BtnLink = (props) => {
    return (
        <a 
            className={'btn-link btn-link-' + props.color} 
            href="#" 
            onClick={props.path?() => props.history.push(props.path):null}>
                {props.text}
        </a>
    );
}

export default BtnLink;