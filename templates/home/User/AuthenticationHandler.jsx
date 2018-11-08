import React, {Component} from 'react';
import propTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';

class AuthenticationHandler extends Component {

    state = {
        loginErrors: [],
        registrationErrors: [],
    };

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
        }).then(response =>
            response.json()
        ).then(data => {
            if ('token' in data) {
                localStorage.setItem('user_token', data.token);
            } else {
                this.setState({loginErrors: data});
            }
        })
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
            if ('token' in data) {
                localStorage.setItem('user_token', data.token);
            } else {
                this.setState({loginErrors: data});
            }
        })
    };

    render() {
        const isLoginShown = this.props.isLoginShown;
        return (
            <React.Fragment>
                {
                    isLoginShown ?
                        <LoginForm errors={this.state.loginErrors} onSubmit={this.handleLogin}/> :
                        <RegistrationForm errors={this.state.registrationErrors} onSubmit={this.handleRegistration}/>
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