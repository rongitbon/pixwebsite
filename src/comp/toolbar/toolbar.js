import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../form/input/input.js';
import Backdrop from "../backdrop/backdrop.js";
import Loginpage from "../float-pages/loginpage/loginpage.js";
import * as action from '../../store/actions/index.js';
import * as actionType from '../../store/actions/actionType.js';
import './toolbar.scss';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        check: false,
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
        },
        show: false
    }

    componentDidMount() {
        console.log(this.props.location.pathname);
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

    handleCheck = (event) => {
        this.setState({check: event.target.checked});
        console.log(event.target.checked);
    }

    render() {
        const backdropShowHandler = () => {
            this.setState({show:!this.state.show});
            console.log(this.state.show);
        }

        const loginpage = () => {
            return(
                <div>
                    <Backdrop show={true} clicked={this.props.closeLoginFrom}/>
                    <Loginpage cancel={this.props.closeLoginFrom}/>
                </div>
            );
        };

        const toolbar = (
            this.props.loggedIn ?
                <ul className="toolbar-nav">
                    <NavLink
                        to="/"
                        className="toolbar-nav-item"
                    >Home</NavLink>
                    <NavLink
                        to="/gallery"
                        className="toolbar-nav-item"
                    >Gallery</NavLink>
                    <NavLink
                        to="/about"
                        className="toolbar-nav-item"
                    >About</NavLink>
                    <NavLink
                        to="/profile"
                        className="toolbar-nav-item"
                    >Profile</NavLink>
                    <li 
                        className="toolbar-nav-item"
                        onClick={this.props.signout}
                    >Sign Out</li>
                </ul>
                :
                <ul className="toolbar-nav">
                    <NavLink
                        to="/"
                        className="toolbar-nav-item"
                    >Home</NavLink>
                    <NavLink
                        to="/gallery"
                        className="toolbar-nav-item"
                    >Gallery</NavLink>
                    <NavLink
                        to="/about"
                        className="toolbar-nav-item"
                    >About</NavLink>
                    <li 
                        className="toolbar-nav-item"
                        onClick={this.props.openLoginFrom}
                    >Login</li>
                </ul>
            
        );

        return (
            <div className={"toolbar " + (this.state.check?("toolbar-hover"):(""))}>
                <input type="checkbox" className="toolbar-checkbox" id ="toolbar" onChange={(e) => this.handleCheck(e)}></input>
                <label htmlFor="toolbar" className="toolbar-button">
                    <span className="toolbar-button-icon"></span>
                </label>
                <div className="toolbar-center">
                    {toolbar}
                    <div className="toolbar-search">
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
                {this.props.loginFrom ? loginpage() : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.account.loggedIn,
        loginFrom: state.form.loginFrom
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openLoginFrom: () => dispatch({ type: actionType.OPEN_LOGIN_FORM}),
        closeLoginFrom: () => dispatch({ type: actionType.CLOSE_LOGIN_FORM}),
        signout: () => dispatch({type: actionType.SIGNOUT}),
        getCardsByName: (name) => dispatch(action.getCardsByName(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));