import React from 'react';
import { withRouter } from 'react-router-dom';

import './btn-link-v2.scss';

const BtnLinkV2 = (props) => {
    return (
        <a 
            className={'btn-link-v2 btn-link-v2-' + props.color} 
            href={props.href?props.href:"#"}
            onClick={props.path?() => props.history.push(props.path):null}>
                {props.text}
        </a>
    );
}

export default withRouter(BtnLinkV2);