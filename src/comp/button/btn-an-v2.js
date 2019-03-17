import React from 'react';
import './btn-an-v2.scss';

const BtnAnV2 = (props) => {
    return (
        <a className={'btn-an-v2 btn-an-v2-' + props.color} href="#">{props.text}</a>
    );
}

export default BtnAnV2;