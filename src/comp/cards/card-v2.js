import React from 'react';
import { connect } from 'react-redux';

import './card-v2.scss';
import * as card from '../../store/actions/index.js';
import BtnCancel from "../button/btn-cancel.js";

const CardV2 = (props) => {
    const characterPath= {
        robotV1: "set_set1/",
        monster: "set_set2/",
        robotV2: "set_set3/",
        kitten: "set_set4/"
    }

    return (
    <div className="cardV2">
        <div className="cardV2-cancel" onClick={() => props.deleteCard(props.card.id)}><BtnCancel color="blue" /></div>
        <img className="cardV2-img" alt='robots' src={`https://robohash.org/${ 
                            characterPath[props.card.character_type] + 
                            props.card.image_path}?50x50`} />
        <div className="cardV2-content">
            <div className="cardV2-content-h">{props.card.name}</div>
            <div className="cardV2-content-t">{props.card.description}</div>
        </div>
        <div className="cardV2-price">{"$" + props.card.price}</div>
    </div> );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCard: (id) => dispatch(card.deleteCard(id))
    };
}

export default connect(null, mapDispatchToProps)(CardV2);