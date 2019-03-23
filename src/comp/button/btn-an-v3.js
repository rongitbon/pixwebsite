import React from 'react';
import './btn-an-v3.scss';

const BtnAnV3 = (props) => {
    return (
        <div className={'btn-an-v3 btn-an-v3-' + props.color} onClick={props.clicked}>{props.text}</div>
    );
}

export default BtnAnV3;