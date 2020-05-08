import React, { Component } from 'react';
import Button from '../../components/UI/button/button.js';
import './auth.css';
import Input from '../../components/UI/input/input.js';
// import axios from 'axios';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth.js';

function validateEmail(email) {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: { 
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessege: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessege: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLenght: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password:  this.state.formControls.password.value,
        //     returnSecureToken: true
        // }
        // try {
        //     const respose = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9JMmdCmtcoZeA6LaToE9Iz0ZAy6oq9xk`, authData)
        
        //     console.log(respose.data)
        // } catch(e) {
        //     console.log('error', e)
        // }
    }

    registerHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )

        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password:  this.state.formControls.password.value,
        //     returnSecureToken: true
        // }
        // try {
        //     const respose = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9JMmdCmtcoZeA6LaToE9Iz0ZAy6oq9xk`, authData)
        
        //     console.log(respose.data)
        // } catch(e) {
        //     console.log('error', e)
        // }
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid ; //трим уберет пробелы
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLenght) {
            isValid = value.length >= validation.minLenght && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}:`, event.target.value);

        const formControls = {...this.state.formControls} //копируем стейт что бы не было мутации
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        
        formControls[controlName] = control; //передаем в стейт

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        
        this.setState({
            formControls,
            isFormValid
        })
    }
 
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => { //в controlName либо email либо password
            const control = this.state.formControls[controlName];
            return (
                <Input 
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                shouldValidate={!!control.validation} //приводим к булевому типу чтобы описать обязательно ли поле
                errorMessege={control.errorMessege}
                onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return(
            <div className='auth'>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.onSubmitHandler} className='authForm'> 

                        {this.renderInputs()}

                        <Button type='success' 
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button 
                        type='primary' 
                        onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);