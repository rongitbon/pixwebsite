import React , {Component} from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import BtnNav from '../button/btn-nav.js';
import Loader from '../loader/loader.js';
import * as card from '../../store/actions/index.js';
import './cardlist.scss';

class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            cardShow: 4,
            cardExtra: 2,
        };
    }

    componentWillMount() {
        this.props.getCheapestCards(this);
        this.calculateCards(this.props);
        console.log(this.props.cardList);
    }

    componentWillReceiveProps(nextProps) {
        this.calculateCards(nextProps)
    }

    moveleft = () => {
        this.setState((state)=>({position: (state.position - 1)}));
        console.log(this.state.position);
    }

    moveright = () => {
        this.setState((state)=>({position: state.position ? (state.position + 1) : -state.cardExtra}));
        console.log(this.state.position);
    }

    calculateCards(props) {
        const cardsShow = this.props.cardList[this.props.character_type] ? 
            this.props.cardList[this.props.character_type].length : 0;
        console.log("hi" + cardsShow);
        let cardsToView = Math.floor((props.width - 250 - 80) / 270);
        cardsToView = (cardsToView > cardsShow - 1)? cardsShow - 1:cardsToView;
        cardsToView = (cardsToView > 4)? 4:cardsToView;
        cardsToView = (cardsToView <= 1)? 1:cardsToView;
        this.setState({
            cardShow: cardsToView,
            cardExtra: cardsShow - cardsToView
        });
    }
    //style={{width:((this.state.cardShow+1)*25 + (this.state.cardShow+3)*2) + "rem"}}
    render(){
        console.log(this.state.cardShow);
        return ( 
            <div className="list" style={{width:((this.state.cardShow+1)*25 + (this.state.cardShow+3)*2) + "rem"}}>
                <BtnNav side="left" onClick = {this.moveright} />
                <Loader load={this.props.load}>
                    <div className="list-card" style={{width:(this.state.cardShow*25  + (this.state.cardShow-1)*2) + "rem" , visibility: this.state.cardShow ? "none" : "hidden"}}>
                        <div className="list-card-pocket" style={{width:(7 * 27 + "rem"), transform:(`translateX( ${ (this.state.position % (this.state.cardExtra + 1)) * 27}rem)`)}}>
                            {this.props.cardList[this.props.character_type] ?
                                this.props.cardList[this.props.character_type].map((card) => {return <Card card={card} />}) : null}
                        </div>
                    </div>
                </Loader>
                <BtnNav side="right" onClick = {this.moveleft} />
            </div>
        );
    }
}

const mapStateToProps = (state,load) => {
    console.log(load);
    console.log(load);
    return {
        cardList: state.card.cheapestCards,
        load: state.card.load.cheapest[load.character_type]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCheapestCards: (comp) => dispatch( card.getCheapestCards(
            comp.props.character_type
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);