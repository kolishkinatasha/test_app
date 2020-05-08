import React, { Component } from 'react';
import './drawer.css';
import BackDrop from '../../UI/backdrop/backdrop.js';
import { NavLink } from 'react-router-dom';

// const links = [
//     { to: '/', label:'Список', exact: true }, 
//     { to: '/auth', label:'Авторизация', exact: false }, 
//     { to: '/quiz-creator', label:'Создать тест', exact: false }, 
// ];

class Drawer extends Component {
    
    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(links) { 
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}    
                        exact={link.exact}
                        activeClassName='active'
                        onClick={this.clickHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    

    render() {
        const drawClass = ['drawer'];

        if (!this.props.isOpen) {
            drawClass.push('close');
        }

        const links = [
            { to: '/', label:'Список', exact: true }, 
            // { to: '/auth', label:'Авторизация', exact: false }, 
            // { to: '/quiz-creator', label:'Создать тест', exact: false },
        ]

        if (this.props.isAuthenticated) { //если зарегистрированы
            links.push({to: '/quiz-creator', label:'Создать тест', exact: false })
            links.push({to: '/logout', label:'Выйти', exact: false })
        } else {
           links.push({ to: '/auth', label:'Авторизация', exact: false })
        }

        return (
            <React.Fragment>
                <nav className={drawClass.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop
                    onClick={this.props.onClose}
                /> : null}                
            </React.Fragment>
            
        )
    }
}

export default Drawer;