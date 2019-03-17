import React from "react";
import "./item-cart.scss";

const ItemCart = () => {
    return (
        <div className="row item-cart">
            <div className="col-1-of-4 item-cart-money"><span className="item-cart-money-cost">$2.22</span></div>
            <div className="col-1-of-4 item-cart-product">
                <img className="item-cart-product-img" alt='robots' src={`https://robohash.org/${1}?1110x1110`} />
            </div>
            <div className="col-2-of-4 item-cart-content">
                <h2 className="item-cart-content-h">fdsfsdf fdds</h2>
                <p className="item-cart-content-description">fdsfdsf dsf dsf fdf ffhj jh  hj hl hjl h kljh kljh jkh hkh  hk jhk jlhl h jkhl hljkhkhkj yuyi g yg yg yi uklh </p>
            </div>
        </div>
    );
};

export default ItemCart;