import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Backdrop from "./comp/backdrop/backdrop.js";
import Loginpage from "./comp/float-pages/loginpage/loginpage.js";
import EditProfilepage from "./comp/float-pages/edit-profile-page/edit-profile-page.js";
import './App.scss';
import Homepage from './comp/Pages/homepage/homepage.js';
import Gallerypage from './comp/Pages/gallerypage/gallerypage.js';
import Profilepage from './comp/Pages/profilepage/profilepage.js';
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
        <Edititempage />
      </div>
    );};

    const cart = () => {
      return(
      <div>
        <Backdrop show={this.props.cartPage} clicked={this.props.closeCartPage} />
        <Cartpage />
      </div>
    );};

    const backdropShowHandler = () => {
      this.setState({show:!this.state.show});
      console.log(this.state.show);
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/gallery" component={Gallerypage} />
          <Route path="/profile" component={Profilepage} />
          <Route path="/about" component={Profilepage} />
          <Route path="/" component={Homepage} />
        </Switch>
        {this.props.editItemFrom ? editItem() : null}
        {this.props.cartPage ? cart() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editItemFrom: state.form.editItemFrom,
    cartPage: state.form.cartPage
  }
};


const mapDispatchToProps = dispatch => {
  return {
      closeEditItemFrom: () => dispatch({ type: actionType.CLOSE_EDIT_ITEM_FORM}),
      closeCartPage: () => dispatch({ type: actionType.CLOSE_CART_PAGE})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
