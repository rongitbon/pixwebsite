import React from 'react';
import { connect } from 'react-redux';

import BtnPurchase from "../button/btn-purchase.js";
import * as actionType from "../../store/actions/actionType.js";
import './card.scss';


const Card = (props) => {
    const characterPath= {
        robotV1: "set_set1/",
        monster: "set_set2/",
        robotV2: "set_set3/",
        kitten: "set_set4/"
    }

    return ( <div className="card">
        <div className="card-side card-side-front">
            <img className="card-side-front-img" alt='robots' src={`https://robohash.org/${ 
                            characterPath[props.card.character_type] + 
                            props.card.image_path}?50x50`} />
            <div className="card-side-front-content">
                <div className="card-side-front-content-h">{props.card.name}</div>
                <div className="card-side-front-content-t">{props.card.description}</div>
            </div>
            <div className="card-side-front-price">{"$" + props.card.price}</div>
        </div>
        <div className="card-side card-side-back">
            <div className="card-side-back-price">
                <p className="card-side-back-price-only">Only</p>
                <p className="card-side-back-price-value">{"$" + props.card.price}</p>
            </div>
            <BtnPurchase text="add to cart" color="yellow" clicked={props.openeCartPage} />
            <BtnPurchase text="buy now" color="blue" clicked={props.openeCartPage} />
        </div>
    </div> );
}

const mapDispatchToProps = dispatch => {
    return {
        openeCartPage: () => dispatch({ type: actionType.OPEN_CART_PAGE})
    }
}

export default connect(null, mapDispatchToProps)(Card);