import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as card from '../../store/actions/index.js';
import Input from '../form/input/input.js';
import './search-menu.scss';

class SearchMenu extends Component {
    state = {
        menu: {
            creatures: {
                elementType: 'checkbox-v1',
                elementConfig: {
                    name: 'creature',
                    options: [
                        {text: 'robotV1', displayText: "RobotV1", value:''},
                        {text: 'robotV2', displayText: "RobotV2", value:''},
                        {text: 'monster', displayText: "Monster", value:''},
                        {text: 'kitten', displayText: "Kitten", value:''}
                    ]
                },
                value: '',
                validation: {},
                valid: false,
                touched: true,
                clicked: false,
                label: false
            },
            price: {
                elementType: 'checkbox-v1',
                elementConfig: {
                    name: 'price',
                    options: [
                        {text: '0', displayText: "Under $1", value:''},
                        {text: '1', displayText: "$1 to $2", value:''},
                        {text: '2 above', displayText: "$2 and Above", value:''}
                    ]
                },
                value: '',
                validation: {},
                valid: false,
                touched: true,
                clicked: false,
                label: false
            },
            time: {
                elementType: 'radio-v2',
                elementConfig: {
                    name: 'date',
                    options: [
                        {text: 'today', displayText: "Today", value:''},
                        {text: 'this week', displayText: "This Week", value:''},
                        {text: 'this month', displayText: "This Month", value:''}
                    ]
                },
                value: ' ',
                validation: {},
                valid: false,
                touched: true,
                clicked: false,
                label: false
            },
        }
    };

    componentWillMount() {
        this.props.getCardsByTheMenu(this, [], []);
    }

    setCards = () => {
        const characters = this.state.menu.creatures.elementConfig.options
            .reduce((cha_list, cha) => (cha.value?[ ...cha_list, cha.value]:cha_list), []);

        const price = this.state.menu.price.elementConfig.options
            .reduce((price_list, price) => (price.value?[ ...price_list, price.value]:price_list), []);

        console.log(price)
        this.props.getCardsByTheMenu(this, characters, price);
    }

    inputChangedHandler = (event, inputIdentifier, i) => {
        const updateMenu = {
            ...this.state.menu
        };
        const updateMenuElement = {
            ...updateMenu[inputIdentifier]
        };
        updateMenuElement.touched = true;
        console.log(event.target.checked);
        updateMenuElement.elementConfig.options[i].value = (updateMenuElement.elementConfig.options[i].value===updateMenuElement.elementConfig.options[i].text)?"":updateMenuElement.elementConfig.options[i].text;
        updateMenuElement.value = (updateMenuElement.value===updateMenuElement.elementConfig.options[i].text)?" ":updateMenuElement.elementConfig.options[i].text;
        updateMenu[inputIdentifier] = updateMenuElement;
        console.log(updateMenuElement.value);
        console.log(updateMenuElement);

        this.setState({menu: updateMenu});
    }

    clickedhandler = (element) => {
        const updateMenu = {
            ...this.state.menu
        };
        const updateMenuElement = {
            ...updateMenu[element]
        };
        updateMenuElement.clicked = !updateMenuElement.clicked;
        updateMenu[element] = updateMenuElement;
        this.setState({menu: updateMenu});
    }

    render () {
        return (
            <div className="search-menu">
                <div className="search-menu-item">
                    <div className="search-menu-item-btn" onClick={()=>(this.clickedhandler("creatures"))}>Creatures</div>
                    <div className="search-menu-item-input" style={{maxHeight: this.state.menu.creatures.clicked?"100rem":"0"}}>
                        <Input
                            elementType={this.state.menu["creatures"].elementType}
                            elementConfig={this.state.menu["creatures"].elementConfig}
                            value={this.state.menu["creatures"].value}
                            invalid={!this.state.menu["creatures"].valid}
                            shouldValidate={this.state.menu["creatures"].validation}
                            touched={this.state.menu["creatures"].touched}
                            changed={(event, index) => this.inputChangedHandler(event, "creatures", index)}
                            label={this.state.menu["creatures"].label}
                            checked={this.state.menu["creatures"].checked}
                            />
                    </div>
                </div>
                <div className="search-menu-item">
                    <div className="search-menu-item-btn" onClick={()=>(this.clickedhandler("price"))}>Price</div>
                    <div className="search-menu-item-input" style={{maxHeight: this.state.menu.price.clicked?"100rem":"0"}}>
                        <Input
                            elementType={this.state.menu["price"].elementType}
                            elementConfig={this.state.menu["price"].elementConfig}
                            value={this.state.menu["price"].value}
                            invalid={!this.state.menu["price"].valid}
                            shouldValidate={this.state.menu["price"].validation}
                            touched={this.state.menu["price"].touched}
                            changed={(event, index) => this.inputChangedHandler(event, "price", index)}
                            label={this.state.menu["price"].label}
                            checked={this.state.menu["price"].checked}
                            />
                        </div>
                </div>
                <div className="search-menu-item">
                    <div className="search-menu-item-btn" onClick={()=>(this.clickedhandler("time"))}>Date</div>
                    <div className="search-menu-item-input" style={{maxHeight: this.state.menu.time.clicked?"100rem":"0"}}>
                        <Input
                            elementType={this.state.menu["time"].elementType}
                            elementConfig={this.state.menu["time"].elementConfig}
                            value={this.state.menu["time"].value}
                            invalid={!this.state.menu["time"].valid}
                            shouldValidate={this.state.menu["time"].validation}
                            touched={this.state.menu["time"].touched}
                            changed={(event, index) => this.inputChangedHandler(event, "time", index)}
                            label={this.state.menu["time"].label}
                            checked={this.state.menu["time"].checked}
                            />
                        </div>
                </div>
                <div className="search-menu-search" onClick={this.setCards}>search</div>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCardsByTheMenu: (comp, characters, price) => dispatch( card.getCardsByTheMenu(
            comp.state.menu.time.value,
            characters,
            price
            )
        )
    };
}

export default connect(null, mapDispatchToProps)(SearchMenu);