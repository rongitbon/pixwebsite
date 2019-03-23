import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CardBook from '../../cards/cardbook.js';
import SearchMenu from '../../search-menu/search-menu.js';
import Input from '../../form/input/input.js';
import Toolbar from '../../toolbar/toolbar.js';
import Backdrop from "../../backdrop/backdrop.js";
import Message from '../../message/message.js';
import Footer from '../../footer/footer.js';
import Loader from '../../loader/loader.js';
import * as card from '../../../store/actions/index.js';
import * as actionType from '../../../store/actions/actionType.js';
import "./gallerypage.scss";

class Gallerypage extends Component {
    state = {
        searchBox: {
            elementType: 'search-box-v1',
            elementConfig: {
                type: 'search',
                placeholder: 'search creature'
            },
            value: '',
            validation: {},
            valid: true,
            touched: true,
            label: false
        }
    }

    searchChangedHandler = (event) => {
        const updateSearch = {
            ...this.state.searchBox
        };
        updateSearch.value = event.target.value;
        updateSearch.touched = true;
        console.log(event.target.value);
        this.setState({searchBox: updateSearch});
    }

    render () {
        const errorMsg = (comp, error_msg) => {
            return(
            <div>
              <Backdrop show={true} clicked={() => this.props.closeErrorMessage(comp)} zindex={1004} />
              <Message 
                header={comp + " error"} 
                content={error_msg}
                btn_clicked={() => this.props.closeErrorMessage(comp)}
                cancel_clicked={() => this.props.closeErrorMessage(comp)}/>
            </div>
          );
        };

        return (
            <div className="gallery">
                <div className="gallery-h">
                    <div className="gallery-h-search-box">
                        <Input
                            elementType={this.state.searchBox.elementType}
                            elementConfig={this.state.searchBox.elementConfig}
                            value={this.state.searchBox.value}
                            invalid={!this.state.searchBox.valid}
                            shouldValidate={this.state.searchBox.validation}
                            touched={this.state.searchBox.touched}
                            changed={(event) => this.searchChangedHandler(event)}
                            clicked={()=> {
                                this.props.history.push('/gallery/1');
                                this.props.getCardsByName(this.state.searchBox.value);
                            }}
                            label={this.state.searchBox.label}
                             />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1-of-4" style={{marginTop: "2rem"}}>
                        <SearchMenu />
                    </div>
                    <div className="col-3-of-4"  style={{textAlign:this.props.loading?"center":null}}>
                        <Loader load={this.props.loading}>
                            <CardBook />
                        </Loader>
                    </div>
                </div>
                <Toolbar />
                <Footer />
                {this.props.errorCardBook?errorMsg("cardBook", this.props.errorCardBookMessage):null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.form.loading.cardBook,
        errorCardBook: state.form.errorForm.cardBook["error"],
        errorCardBookMessage: state.form.errorForm.cardBook.content
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByName: (name) => dispatch(card.getCardsByName(name)),
        closeErrorMessage: (comp) => dispatch({ type: actionType.CLOSE_ERROR_MESSAGE,
            comp: comp})
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gallerypage));