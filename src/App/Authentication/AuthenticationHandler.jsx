import React, { Component } from 'react';
import propTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';
import axios from 'axios';

class AuthenticationHandler extends Component {
    state = {
        isLoginShown: true,
        loginErrors: [],
        registrationErrors: [],
    };

    toggleShow = () => {
        this.setState(state => ({ isLoginShown: !this.state.isLoginShown }));
    };

    handleLogin = async (username, password) => {
        await fetch('/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        })
            .then(response =>
                response.json(),
            )
            .then(data => {
                if ('token' in data) {
                    localStorage.setItem('user_token', data.token);
                } else {
                    this.setState({ loginErrors: data });
                }
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
            if ('token' in data) {
                localStorage.setItem('user_token', data.token);
            } else {
                this.setState({registrationErrors: data});
            }
        })
    };

    render() {
        const isLoginShown = this.state.isLoginShown;
        return (
            <React.Fragment>
                <div className="container col-md-5 mt-5">
                    <div className="card">
                        {
                            isLoginShown ? <LoginForm errors={this.state.loginErrors} onSubmit={this.handleLogin}/> :
                                <RegistrationForm errors={this.state.registrationErrors}
                                                  onSubmit={this.handleRegistration}/>
                        }
                        <AuthenticationNavigation isLoginShown={isLoginShown} onClick={this.toggleShow}/>
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default AuthenticationHandler;