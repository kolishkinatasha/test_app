import React from 'react';
import './menu-toggle.css';

const MenuToggle = props => {

    const menuClass = [
        'menuToggle',
        'fa'
    ]

    if (props.isOpen) {
        menuClass.push('fa-times')
        menuClass.push('open')
    } else {
        menuClass.push('fa-bars')
    }

    return(
        <i className={menuClass.join(' ')}
            onClick={props.onToggle}/>
    )
}

export default MenuToggle;