import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from "./comp/backdrop/backdrop.js";
import Message from "./comp/message/message.js";
import Loginpage from "./comp/float-pages/loginpage/loginpage.js";
import EditProfilepage from "./comp/float-pages/edit-profile-page/edit-profile-page.js";
import './App.scss';
import Homepage from './comp/Pages/homepage/homepage.js';
import Gallerypage from './comp/Pages/gallerypage/gallerypage.js';
import Profilepage from './comp/Pages/profilepage/profilepage.js';
import Aboutpage from './comp/Pages/aboutpage/aboutpage.js';
import Edititempage from './comp/float-pages/edit-item-page/edit-item-page.js';
import Cartpage from './comp/float-pages/cart-page/cart-page.js';
import * as actionType from './store/actions/actionType.js';

class App extends Component {
  state = {
    show: true
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
    if (!this.state.show) {
      this.setState({show:true});
    }
  }

  render() {

    const editItem = () => {
      return(
      <div>
        <Backdrop show={this.props.editItemFrom} clicked={this.props.closeEditItemFrom} />
        <Edititempage cancel={this.props.closeEditItemFrom} />
      </div>
    );};

    const editProfile = () => {
      return(
      <div>
        <Backdrop show={this.props.editProfileFrom} clicked={this.props.closeEditProfileFrom} />
        <EditProfilepage cancel={this.props.closeEditProfileFrom} />
      </div>
    );};

    const cart = () => {
      return(
      <div>
        <Backdrop show={this.props.cartPage} clicked={this.props.closeCartPage} />
        <Cartpage cancel={this.props.closeCartPage} />
      </div>
    );};

    const message = () => {
      return(
      <div>
        <Backdrop show={this.props.message.open} clicked={this.props.closeMessage} zindex={1002}/>
        <Message 
          header={this.props.message.header} 
          content={this.props.message.content}
          btn_clicked={this.props.closeMessage}
          cancel_clicked={this.props.closeMessage}/>
      </div>
    );};

    const backdropShowHandler = () => {
      this.setState({show:!this.state.show});
      console.log(this.state.show);
    }

    return (
      <div className="App">
      {this.props.message.open ? message() : null}
        <Switch>
          <Route path="/gallery" component={Gallerypage} />
          {this.props.loggedIn?<Route path="/profile" component={Profilepage} />:null}
          <Route path="/about" component={Aboutpage} />
          <Route path="/" component={Homepage} />
        </Switch>
        {this.props.editItemFrom ? editItem() : null}
        {this.props.editProfileFrom ? editProfile() : null}
        {this.props.cartPage ? cart() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editItemFrom: state.form.editItemFrom,
    cartPage: state.form.cartPage,
    message: state.form.message,
    editProfileFrom: state.form.editProfileFrom,
    openMessage: state.form.message.open,
    loggedIn: state.account.loggedIn
  }
};


const mapDispatchToProps = dispatch => {
  return {
      closeEditItemFrom: () => dispatch({ type: actionType.CLOSE_EDIT_ITEM_FORM}),
      closeCartPage: () => dispatch({ type: actionType.CLOSE_CART_PAGE}),
      closeMessage: () => dispatch({ type: actionType.CLOSE_MESSAGE}),
      closeEditProfileFrom: () => dispatch({ type: actionType.CLOSE_EDIT_PROFILE_FORM}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
