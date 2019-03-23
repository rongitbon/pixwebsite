import React, { Component } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../backdrop/backdrop.js';
import Message from '../../message/message.js';
import Input from '../../form/input/input.js';
import Hsecondary from "../../heading-secondary/h-secondary.js";
import BtnAn from "../../button/btn-an.js";
import BtnCancel from "../../button/btn-cancel.js";
import FormLogin from "../../form/form-login.js";
import FormSignup from "../../form/form-signup.js";
import * as actionType from "../../../store/actions/actionType.js";
import "./loginpage.scss";


class Loginpage extends Component {
    state = {
        formfront: "login",
    } 

    formChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({formfront: event.target.value});
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
            <div>
                {this.props.errorLogin?errorMsg("login", this.props.errorLoginMessage):null}
                {this.props.errorSignup?errorMsg("signup", this.props.errorSignupMessage):null}
                <div className="loginpage">
                    <div className="loginpage-cancel" onClick={this.props.cancel}>
                        <BtnCancel color={this.state.formfront === 'login'?"white":"blue"} /></div>
                    <input
                        className="loginpage-input"
                        type="radio"
                        value="login"
                        name="loginpage"
                        id="login"
                        onChange={this.formChangedHandler}
                        checked={"login" === this.state.formfront}
                    / >
                    <label
                        className="loginpage-label"
                        htmlFor="login"
                    >
                        Login
                    </label>
                    <input
                        className="loginpage-input"
                        type="radio"
                        value="signup"
                        name="loginpage"
                        id="signup"
                        onChange={this.formChangedHandler}
                        checked={"signup" === this.state.formfront}
                    / >
                    <label
                        className="loginpage-label"
                        htmlFor="signup"
                    >
                        Signup
                    </label>
                    {this.state.formfront === "login"?<FormLogin />:<FormSignup />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorLogin: state.form.errorForm.login["error"],
        errorLoginMessage: state.form.errorForm.login.content,
        errorSignup: state.form.errorForm.signup["error"],
        errorSignupMessage: state.form.errorForm.signup.content
    };
}

const mapDispatchToProps = dispatch => {
  return {
    closeErrorMessage: (comp) => dispatch({ type: actionType.CLOSE_ERROR_MESSAGE,
                                            comp: comp})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);