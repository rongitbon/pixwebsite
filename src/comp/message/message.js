import React from 'react';
import BtnAn from '../button/btn-an.js';
import Hsecondary from '../heading-secondary/h-secondary.js';
import BtnCancel from "../button/btn-cancel.js";
import './message.scss';

const Message = (props) => {
    return (
        <div className="message">
            <div className="message-cancel" onClick={props.cancel_clicked}><BtnCancel color="white"/></div>
            <div className="message-header"><Hsecondary color="white" text={props.header} /></div>
            <div className="message-content">{"" + props.content}<br/><br/></div>
            <div className="message-btn" onClick={props.btn_clicked}><BtnAn text="OK" color="blue"/></div>
        </div>
    );
}

export default Message;