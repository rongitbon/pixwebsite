import React from 'react';
import "./input.scss";

const Input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className="input"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('input-v1'):
            inputElement = <input 
                className={"input-v1"}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('textarea-v1'):
            inputElement = <textarea
                className={"textarea-v1"}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('select-v1'):
            inputElement =(
                <select
                    className={"select-v1"}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayText}
                        </option>
                    ))}
                </select>);
            break;

        case ('search-box-v1'):
            inputElement = <div className="search-box-v1">
                <input 
                    className={"search-box-v1-input"}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    onKeyPress={(event) => event.key === "Enter"?props.clicked(event):null}
                    />
                <p className="search-box-v1-btn" onClick={props.clicked}>⏪</p>
            </div>
            break;

        case ('radio-v1'):
            inputElement = props.elementConfig.options.map(option => (
                    <div 
                        className={"radio-v1"} 
                        key={option.text}
                        value={props.value}
                        >
                            <input
                                className={"radio-v1-input"}
                                type={'radio'}
                                id={option.text}
                                name={props.elementConfig.name}
                                value={option.text}
                                onChange={props.changed}
                                checked={props.value === option.text}
                            >
                            </input>
                            <label
                                className={"radio-v1-label"}
                                htmlFor={option.text}
                            >
                                <span className={"radio-v1-button"}></span>
                                {option.displayText}
                            </label>

                    </div>
                ))
            break;
        
        case ('radio-v2'):
            inputElement = props.elementConfig.options.map((option ,index) => (
                    <div 
                        className={"radio-v2"} 
                        key={option.text}
                        value={props.value}
                        >
                            <input
                                key={option.text}
                                className={"radio-v2-input"}
                                type={'radio'}
                                id={option.text}
                                name={props.elementConfig.name}
                                checked={props.value === option.text}
                                onClick={(event) => (props.changed(event, index))}
                                value={props.value}
                            >
                            </input>
                            <label
                                className={"radio-v2-label"}
                                htmlFor={option.text}
                            >
                                {option.displayText}
                            </label>

                    </div>
                ))
            break;
        
        case ('checkbox-v1'):
            inputElement = props.elementConfig.options.map((option, index) => (
                    <div 
                        className={"checkbox-v1"} 
                        key={option.text}
                        value={props.value}
                        >
                            <input
                                className={"checkbox-v1-input"}
                                type={'checkbox'}
                                id={option.text}
                                name={props.elementConfig.name}
                                checked={option.value === option.text}
                                onClick={(event) => (props.changed(event, index))}
                                value={option.value}
                            >
                            </input>
                            <label
                                className={"checkbox-v1-label"}
                                htmlFor={option.text}
                            >
                                {option.displayText}
                            </label>

                    </div>
                ))
            break;
        
        default:
            inputElement = <input 
                className="input"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div>
            {inputElement}
            {(props.label)?(<div className="label">{props.elementConfig.placeholder}</div>):""}
        </div>
    );
}

export default Input;