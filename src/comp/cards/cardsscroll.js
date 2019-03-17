import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import CardV2 from './card-v2.js';
import CardAdd from './cardadd.js';
import BtnPageNav from '../button/btn-page-nav.js';
import Scroll from '../scroll/scroll.js';
import "./cardbook.scss";

class CardsScroll extends Component {

    render() {
        return (
            <Scroll>
                <div className="cardsscroll">
                    {this.props.user.map((card) => <CardV2 card={card} key={card.name}/>)}
                    <CardAdd />
                </div>
            </Scroll>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.card.userCards,
        load: state.card.load.book
    };
}

export default connect(mapStateToProps)(CardsScroll);