import React from 'react';
import './input.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}
 
const Input = props => {

    const inputType = props.type || 'text';
    const classes = ['input'];
    const htmlFor = `${inputType} - ${Math.random()}`

    if (isInvalid(props)) {
        classes.push('invalid')
    }

    return (
        <div className={classes.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}>
            </input>

            {
                isInvalid(props)
                ? <span>{props.errorMassage ||'Введите верное значение'}</span>
                : null
            }

            
        </div>
    )
}

export default Input;