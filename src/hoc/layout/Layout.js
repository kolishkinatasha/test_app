import React, {Component} from 'react';
import './layout.css';
import MenuToggle from '../../components/navigation/MenuToggle/menu-toggle.js';
import Drawer from '../../components/navigation/drawer/drawer.js';
import { connect } from 'react-redux';

class Layout extends Component {

    state={
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }    
    render() {
        return(
            <div className='Layout'>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
