import  React, { Component } from 'react';
import { connect } from 'react-redux';

import './cardadd.scss';
import * as actionType from "../../store/actions/actionType.js";

class CardAdd extends Component {

    render () {
        return (
            <div className="cardadd" onClick={this.props.openEditItemFrom}>
                <div className="cardadd-btn">  
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openEditItemFrom: () => dispatch({ type: actionType.OPEN_EDIT_ITEM_FORM})
    }
}

export default connect(null, mapDispatchToProps)(CardAdd);