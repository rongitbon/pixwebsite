import React, { Component } from 'react';
import Input from '../../form/input/input.js';
import Hsecondary from "../../heading-secondary/h-secondary.js";
import BtnAn from "../../button/btn-an.js";
import "./edit-profile-page.scss";


class EditProfilepage extends Component {
    state = {
        editProfileForm: {
            imgpath: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter image'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: true
            },
            nickname: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter nickname'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: true
            },
            email: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your email'
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
            profiledescription: {
                elementType: 'textarea-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter description'
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
            isValid = /^\d+$/.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateEditProfileForm = {
            ...this.state.editProfileForm
        };
        const updateFormElement = {
            ...updateEditProfileForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateEditProfileForm[inputIdentifier] = updateFormElement;
        console.log(event.target.value);
        console.log(event.target.checked);

        this.setState({editProfileForm: updateEditProfileForm});
    }

    formChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({formfront: event.target.value});
    }

    render () {
        return (
            <div className="editProfilePage">
                <div className="editProfilePage-h"><Hsecondary text={"updating item"} /></div>
                <div style={{padding: "5rem"}}>
                    {Object.keys(this.state.editProfileForm).map(key => (
                    <Input
                        key={key}
                        elementType={this.state.editProfileForm[key].elementType}
                        elementConfig={this.state.editProfileForm[key].elementConfig}
                        value={this.state.editProfileForm[key].value}
                        invalid={!this.state.editProfileForm[key].valid}
                        shouldValidate={this.state.editProfileForm[key].validation}
                        touched={this.state.editProfileForm[key].touched}
                        changed={(event) => this.inputChangedHandler(event, key)}
                        label={this.state.editProfileForm[key].label}
                        />
                    ))}
                </div>
                <div className="editProfilePage-btn"><BtnAn color={"blue"} text={"sign up"} /></div>
            </div>
        );
    }
}

export default EditProfilepage;