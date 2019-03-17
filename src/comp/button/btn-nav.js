import React from 'react';
import './btn-nav.scss';

const BtnNav = (props) => {
    return (
        <div onClick={props.onClick} className={'btn-nav btn-nav' + (props.side === "left" ? "-side-left" : "-side-right")} >
            <div className="btn-nav-char">
                {props.side === "left" ? "<" : ">"}
            </div>
        </div>
    );
}

export default BtnNav;