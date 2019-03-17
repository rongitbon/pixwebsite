import React from 'react';
import './btn-link-v2.scss';

const BtnLinkV2 = (props) => {
    return (
        <a className={'btn-link-v2 btn-link-v2-' + props.color} href={props.href?props.href:"#"}>{props.text}</a>
    );
}

export default BtnLinkV2;