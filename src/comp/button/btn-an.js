import React from 'react';
import './btn-an.scss';

const BtnAn = (props) => {
    return (
        <a 
            className={'btn-an btn-an-' + props.color} 
            onClick={props.path?() => props.history.push(props.path):null}>
                {props.text}
            </a>
    );
}

export default BtnAn;