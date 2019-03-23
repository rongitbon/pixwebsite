import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../form/input/input.js';
import Hsecondary from "../../heading-secondary/h-secondary.js";
import Loader from '../../loader/loader.js';
import BtnAn from "../../button/btn-an.js";
import BtnCancel from "../../button/btn-cancel.js";
import * as action from '../../../store/actions/index.js';
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
                    required: false,
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
                    required: false
                },
                valid: false,
                touched: false,
                label: true
            }
        }
    };

    componentWillMount () {
        const updateEditProfileForm = {
            ...this.state.editProfileForm
        };

        updateEditProfileForm.imgpath.value = this.props.user.image?this.props.user.image:"";
        updateEditProfileForm.imgpath.valid = 
            this.checkValidity(updateEditProfileForm.imgpath.value, updateEditProfileForm.imgpath.validation);

        updateEditProfileForm.profiledescription.value = this.props.user.description?this.props.user.description:"";
        updateEditProfileForm.profiledescription.valid = 
            this.checkValidity(updateEditProfileForm.profiledescription.value, updateEditProfileForm.profiledescription.validation);

        updateEditProfileForm.email.value = this.props.user.email;
        updateEditProfileForm.email.valid = 
            this.checkValidity(updateEditProfileForm.email.value, updateEditProfileForm.email.validation);

        updateEditProfileForm.nickname.value = this.props.user.nickname;
        updateEditProfileForm.nickname.valid = 
            this.checkValidity(updateEditProfileForm.nickname.value, updateEditProfileForm.nickname.validation);

        this.setState({editProfileForm: updateEditProfileForm});
    }

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
        const sendRequestHandler = () => {
            if (this.state.editProfileForm.nickname.valid && 
                this.state.editProfileForm.email.valid &&
                this.props.user.id ){
                    console.log("connect");
                    this.props.updateProfile(this);
            }
            else {
                console.log("error");
            }
        }

        return (
            <div className="editProfilePage">
                <div className="editProfilePage-cancel" onClick={this.props.cancel}><BtnCancel color="blue" /></div>
                <Loader load={this.props.loading}>
                    <div className="editProfilePage-h"><Hsecondary text={"update item"} /></div>
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
                    <div className="editProfilePage-btn" onClick={() => sendRequestHandler()}><BtnAn color={"blue"} text={"update"} /></div>
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.account.user,
        loading: state.form.loading.editProfile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (comp) => dispatch( action.updateProfile(
            comp.props.user.id,
            comp.props.user.email,
            comp.state.editProfileForm.nickname.value, 
            comp.state.editProfileForm.profiledescription.value,
            comp.state.editProfileForm.email.value,
            comp.state.editProfileForm.imgpath.value
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilepage);