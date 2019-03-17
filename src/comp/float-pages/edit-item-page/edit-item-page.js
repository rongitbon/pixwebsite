import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../form/input/input.js';
import Hsecondary from "../../heading-secondary/h-secondary.js";
import BtnAn from "../../button/btn-an.js";
import Loader from '../../loader/loader.js';
import * as card from '../../../store/actions/index.js';
import "./edit-item-page.scss";


class Edititempage extends Component {
    state = {
        editItemForm: {
            imgpath: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter item image path name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: true
            },
            
            itemselection: {
                elementType: 'select-v1',
                elementConfig: {
                    placeholder: ' , ',
                    options: [
                        {displayText: "RobotV1", value:'robotV1'},
                        {displayText: "Monster", value:'monster'},
                        {displayText: "RobotV2", value:'robotV2'},
                        {displayText: "Kitten", value:'kitten'}
                    ]
                },
                value: 'robotV1',
                validation: {},
                valid: true,
                touched: false,
                label: true
            },
            itemname: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter item name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: true
            },
            itemprice: {
                elementType: 'input-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter item price'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                label: true
            },
            itemdescription: {
                elementType: 'textarea-v1',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter item description'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: true
            }
        },
        characterPath: {
            robotV1: "set_set1/",
            monster: "set_set2/",
            robotV2: "set_set3/",
            kitten: "set_set4/"
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
        const updateEditItemForm = {
            ...this.state.editItemForm
        };
        const updateFormElement = {
            ...updateEditItemForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateEditItemForm[inputIdentifier] = updateFormElement;
        console.log(event.target.value);
        console.log(event.target.checked);

        this.setState({editItemForm: updateEditItemForm});
    }

    formChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({formfront: event.target.value});
    }

    render () {
        const sendRequestHandler = () => {
            if (this.state.editItemForm.imgpath.valid && 
                this.state.editItemForm.itemselection.valid &&
                this.state.editItemForm.itemname.valid &&
                this.state.editItemForm.itemprice.valid &&
                this.props.user.id ){
                    console.log("connect");
                    this.props.addCard(this);
            }
            else {
                console.log("error");
            }
        }

        return (
            <div className="editItemPage">
                <Loader load={this.props.loading}>
                    <div className="editItemPage-h"><Hsecondary text={"updating item"} /></div>
                    <div className="row">
                        <div className="col-1-of-4" style={{textAlign: "center"}}>
                            <img className="card-side-front-img" alt='robots' src={`https://robohash.org/${ 
                                this.state.characterPath[this.state.editItemForm.itemselection.value] + 
                                this.state.editItemForm.imgpath.value}?50x50`} />
                        </div>
                        <div className="col-1-of-2" style={{paddingTop: "1rem" ,textAlign: "left"}}>
                            {Object.keys(this.state.editItemForm).map(key => (
                            <Input
                                key={key}
                                elementType={this.state.editItemForm[key].elementType}
                                elementConfig={this.state.editItemForm[key].elementConfig}
                                value={this.state.editItemForm[key].value}
                                invalid={!this.state.editItemForm[key].valid}
                                shouldValidate={this.state.editItemForm[key].validation}
                                touched={this.state.editItemForm[key].touched}
                                changed={(event) => this.inputChangedHandler(event, key)}
                                label={this.state.editItemForm[key].label}

                                />
                            ))}
                        </div>
                    </div>
                    <div className="editItemPage-btn" onClick={() => sendRequestHandler()}><BtnAn color={"blue"} text={"sign up"} /></div>
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.account.user,
        loading: state.form.loading.editItem
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: (comp) => dispatch( card.addCard(
            comp.state.editItemForm.imgpath.value, 
            comp.state.editItemForm.itemselection.value,
            comp.state.editItemForm.itemname.value,
            comp.state.editItemForm.itemdescription.value,
            comp.state.editItemForm.itemprice.value,
            comp.props.user.id
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edititempage);