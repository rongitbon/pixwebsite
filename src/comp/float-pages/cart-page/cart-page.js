import React, { Component } from 'react';
import { connect } from 'react-redux';

import BtnAn from "../../button/btn-an.js";
import BtnCancel from "../../button/btn-cancel.js";
import ItemCart from "./item-cart/item-cart.js";
import Scroll from '../../scroll/scroll.js';
import * as actionType from "../../../store/actions/actionType.js";
import "./cart-page.scss";


class Cartpage extends Component {

    characterPath = {
        robotV1: "set_set1/",
        monster: "set_set2/",
        robotV2: "set_set3/",
        kitten: "set_set4/"
    };

    createMessage = () => this.props.cart.map((item) => {
        return  item.name + " : " + "https://robohash.org/" +
            this.characterPath[item.character_type] + item.image_path;
    },"");

    render () {
        const createMessage = () => this.props.cart.map((item) => {
            return <div><br/>  item.name + " : " + "https://robohash.org/" +
                this.characterPath[item.character_type] + item.image_path </div>;
        },"");

        return (
            <div className="cartPage">
                <div className="cartPage-cancel" onClick={this.props.cancel}><BtnCancel color="blue" /></div>
                <div className="cartPage-items">
                    <Scroll>
                        {this.props.cart.map((item) => <ItemCart item={item} key={item.name}/>)}
                    </Scroll>
                </div>
                <div className="cartPage-btn" onClick={() => this.props.openMessage(this.createMessage())}>
                    <BtnAn color={"blue"} text={"get the urls"} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openMessage: (message) => dispatch({
            type: actionType.OPEN_MESSAGE,
            message: message
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cartpage);