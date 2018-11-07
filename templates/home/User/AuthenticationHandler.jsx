import React, {Component} from 'react';
import propTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';

class AuthenticationHandler extends Component {

    handleLogin = async (username, password) => {
        await fetch("/api/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            localStorage.setItem('user_token', data.token);
        }).catch(error => {
            console.log(error);
        });
    };

    handleRegistration = async (user) => {
        await fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response =>
            response.json()
        ).then(data => {
            localStorage.setItem('user_token', data.token);
        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        const isLoginShown = this.props.isLoginShown;
        return (
            <React.Fragment>
                {
                    isLoginShown ?
                        <LoginForm onSubmit={this.handleLogin}/> :
                        <RegistrationForm onSubmit={this.handleRegistration}/>
                }
                <AuthenticationNavigation isLoginShown={isLoginShown} onClick={this.props.onChange}/>
            </React.Fragment>
        )
    };
}

AuthenticationHandler.propTypes = {
    isLoginShown: propTypes.bool.isRequired,
};

export default AuthenticationHandler;