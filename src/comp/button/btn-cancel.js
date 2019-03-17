import React from 'react';
import './btn-cancel.scss';

const BtnCancel = (props) => {
    return (
        <div className={'btn-cancel btn-cancel-' + props.color}><span className={'btn-cancel-x'}>X</span></div>
    );
}

export default BtnCancel;