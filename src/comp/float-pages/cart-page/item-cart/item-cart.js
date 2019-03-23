import React from "react";
import "./item-cart.scss";

const ItemCart = (props) => {
    const characterPath= {
        robotV1: "set_set1/",
        monster: "set_set2/",
        robotV2: "set_set3/",
        kitten: "set_set4/"
    };

    return (
        <div className="row item-cart">
            <div className="col-1-of-4 item-cart-money"><span className="item-cart-money-cost">{"$" + props.item.price}</span></div>
            <div className="col-1-of-4 item-cart-product">
                <img className="item-cart-product-img" alt='robots' src={`https://robohash.org/${ 
                            characterPath[props.item.character_type] + 
                            props.item.image_path}?50x50`} />
            </div>
            <div className="col-2-of-4 item-cart-content">
                <h2 className="item-cart-content-h">{props.item.name}</h2>
                <p className="item-cart-content-description">{props.item.description}</p>
            </div>
        </div>
    );
};

export default ItemCart;