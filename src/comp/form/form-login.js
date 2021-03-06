import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from "../loader/loader.js";
import Input from './input/input.js';
import Hsecondary from "../heading-secondary/h-secondary.js";
import BtnAn from "../button/btn-an.js";
import * as action from '../../store/actions/index.js';
import "./form-login.scss";

class FormLogin extends Component {
    state = {
        signupForm: {
            email: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                label: true
            },
            password: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: true
            }
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) && isValid;
        }

        if (rules.isNumeric) {
            isValid = /-?\d+(\.\d+)/.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateSignupForm = {
            ...this.state.signupForm
        };
        const updateFormElement = {
            ...updateSignupForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateSignupForm[inputIdentifier] = updateFormElement;
        console.log(event.target.value);
        console.log(event.target.checked);

        this.setState({signupForm: updateSignupForm});
    }


    render () {
        const sendRequestHandler = () => {
            if (this.state.signupForm.email.valid && 
                this.state.signupForm.password.valid){
                    this.props.login(this);
            }
            else {
                this.props.openErrorMessage('Please fill in the empty row or check ' +
                'the information has been entered correctly');
            }
        }

        return (
            <div className="form-login" style={{textAlign:this.props.loading?"center":null}}>
                <Loader load={this.props.loading}>
                    <div className="form-login-h">
                        <Hsecondary text="Login"/>
                    </div>
                    {Object.keys(this.state.signupForm).map(key => (
                        <Input
                            key={key}
                            elementType={this.state.signupForm[key].elementType}
                            elementConfig={this.state.signupForm[key].elementConfig}
                            value={this.state.signupForm[key].value}
                            invalid={!this.state.signupForm[key].valid}
                            shouldValidate={this.state.signupForm[key].validation}
                            touched={this.state.signupForm[key].touched}
                            changed={(event) => this.inputChangedHandler(event, key)}
                            label={this.state.signupForm[key].label}
                            />
                    ))}
                    <div className="form-login-btn" onClick={sendRequestHandler}><BtnAn color={"blue"} text={"login"} /></div>
                </Loader>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.form.loading.login
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (comp) => dispatch( action.login(
            comp.state.signupForm.email.value,
            comp.state.signupForm.password.value
            )
        ),
        openErrorMessage : (msg) => dispatch (action.compFailed(msg, 'login'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);