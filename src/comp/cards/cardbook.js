import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import BtnPageNav from '../button/btn-page-nav.js';
import "./cardbook.scss";

class CardBook extends Component {
    state = {
        pages: 1,
        page_current: 1,
        num_cards_page: 12
    }

    movePrevious = () => {
        this.setState({
            pages: this.state.pages > 1? this.state.pages - 1 : 1
        });
    }
    moveNext = (comp) => {
        comp.setState({
            pages: Math.ceil(comp.props.gallery.length / comp.state.num_cards_page) >  
                comp.state.pages ? comp.state.pages + 1 : Math.ceil(comp.props.gallery.length / comp.state.num_cards_page)
        });
    }

    movePageByNumber = (num) => {
        if( num > 0 && num <= Math.ceil(this.props.gallery.length / this.state.num_cards_page)) {
            this.setState({pages: num});
        }
    }

    render() {
        return (
            <div className="cardbook">
                <div>
                {this.props.gallery.map((card, index) => {
                    if((this.state.pages-1)*this.state.num_cards_page <= index && 
                        this.state.pages*this.state.num_cards_page > index){ 
                            return <Card card={card} key={card.name}/>
                    }
                    })}
                </div>
                <div className="cardbook-buttons">
                    <BtnPageNav 
                        text="<" 
                        num={this.state.pages > 1? this.state.pages - 1 : 1}
                        clicked={() => this.movePrevious(this)}/>
                    {Array.from(Array(Math.ceil(
                        this.props.gallery.length / this.state.num_cards_page
                        )).keys()).map((num) =>{
                            return <BtnPageNav 
                                text={num + 1} 
                                current={num + 1 === this.state.pages}
                                key={num + 1}
                                num={num + 1}
                                clicked={() => this.movePageByNumber(num + 1)}/>
                            })}
                    <BtnPageNav 
                        text=">" 
                        num={Math.ceil(this.props.gallery.length / this.state.num_cards_page) >  
                            this.state.pages ? this.state.pages + 1 : Math.ceil(this.props.gallery.length / this.state.num_cards_page)} 
                        clicked={() => this.moveNext(this)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gallery: state.card.galleryCards,
        load: state.card.load.book
    };
}

export default connect(mapStateToProps)(CardBook);