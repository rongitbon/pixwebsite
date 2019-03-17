import React, { Component } from 'react';
import Input from '../../form/input/input.js';
import Hsecondary from "../../heading-secondary/h-secondary.js";
import BtnAn from "../../button/btn-an.js";
import ItemCart from "./item-cart/item-cart.js";
import Scroll from '../../scroll/scroll.js';
import "./cart-page.scss";


class Cartpage extends Component {

    render () {
        return (
            <div className="cartPage">
                <div className="cartPage-items">
                    <Scroll>
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                        <ItemCart />
                    </Scroll>
                </div>
                <div className="cartPage-btn"><BtnAn color={"blue"} text={"get the urls"} /></div>
            </div>
        );
    }
}

export default Cartpage;