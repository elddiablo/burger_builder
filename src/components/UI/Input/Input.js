import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = '';

    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = 'Please, fill in the ' + props.inputName;
    }

    switch(props.elementType) {
        case ('input'): 
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
        case ('textarea'): 
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
        case ('select'): 
            inputElement = <select className={inputClasses.join(' ')} onChange={props.changed} >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default: 
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} />
            break;
    }   
    return(
        <div>
            <label>{validationError}</label>
            {inputElement}
        </div>
    );
};

export default input;