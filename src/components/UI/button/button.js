import React from 'react';
import './button.css';

const Button = props => {

    const btnClass = [
        'button ',
        [props.type]
    ]

    return(
        <button className={btnClass.join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button;