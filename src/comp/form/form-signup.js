import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './input/input.js';
import Hsecondary from "../heading-secondary/h-secondary.js";
import BtnAn from "../button/btn-an.js";
import Loader from "../loader/loader.js";
import * as action from '../../store/actions/index.js';
import "./form-signup.scss";

class FormSignup extends Component {
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
            nickname: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your nickname'
                },
                value: '',
                validation: {
                    required: true,
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
                    required: true,
                    confirm: true
                },
                valid: false,
                touched: false,
                label: true
            },
            passwordRepeat: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                value: '',
                validation: {
                    required: true,
                    confirm: true
                },
                valid: false,
                touched: false,
                label: true
            },
            acceptSignup: {
                elementType: 'radio-v1',
                elementConfig: {
                    name: 'acceptsignup',
                    options: [
                        {text: 'acceptsignup', displayText: "Accept", value:'acceptsignup'},
                        {text: 'declinesignup', displayText: "Decline", value:'declinesignup'}
                    ]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false,
                label: true
            }
        }
    };

    checkValidity(value, rules, inputIdentifier) {
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
            console.log(isValid);
        }

        if (rules.isNumeric) {
            isValid = /-?\d+(\.\d+)/.test(value) && isValid;
        }
        if (rules.confirm) {
            const updateSignupForm = {
                ...this.state.signupForm
            };

            if (inputIdentifier === "password") {
                isValid = value === this.state.signupForm.passwordRepeat.value && isValid;
                updateSignupForm.passwordRepeat.valid = isValid;
            } 
            else {
                isValid = value === this.state.signupForm.password.value && isValid;
                updateSignupForm.password.valid = isValid;
            }
            console.log("aaaaa " + isValid );
            this.setState({signupForm: updateSignupForm});
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
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation ,inputIdentifier);
        updateFormElement.touched = true;
        updateSignupForm[inputIdentifier] = updateFormElement;
        console.log(event.target.value);
        console.log(event.target.checked);
        console.log(updateFormElement.valid);

        this.setState({signupForm: updateSignupForm});
    }


    render () {
        const sendRequestHandler = () => {
            if (this.state.signupForm.email.valid && 
                this.state.signupForm.nickname.valid &&
                this.state.signupForm.password.valid){
                    this.props.signup(this);
            }
            else {
                this.props.openErrorMessage('Please fill in the empty row or check ' +
                'the information has been entered correctly');
            }
        }

        return (
            <div className="form-signup" style={{textAlign:this.props.loading?"center":null}}>
                <Loader load={this.props.loading}>
                    <div className="form-signup-h">
                        <Hsecondary text="signup"/>
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
                    <div className="form-signup-btn" onClick={() => sendRequestHandler()}> <BtnAn color={"blue"} text={"sign up"} /></div>
                </Loader>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.form.loading.signup
    };
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (comp) => dispatch( action.signup(
            comp.state.signupForm.email.value,
            comp.state.signupForm.nickname.value,
            comp.state.signupForm.password.value
            )
        ),
        openErrorMessage : (msg) => dispatch (action.compFailed(msg, 'signup'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSignup);