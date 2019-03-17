import React from 'react';
import './btn-purchase.scss';

const BtnPurchase = (props) => {
    return (
        <div onClick={props.clicked} className={'btn-purchase ' + props.color } >
            <div className={'btn-purchase-inside ' + props.color } >{props.text}</div>
        </div>
    );
}

export default BtnPurchase;