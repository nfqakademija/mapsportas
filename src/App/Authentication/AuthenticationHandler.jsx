import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';

class AuthenticationHandler extends Component {
    state = {
        isLoginShown: true,
        loginErrors: null,
        registrationErrors: [],
        isLoading: false,
    };

    handleUserSuccess = (token) => {
        localStorage.setItem('user_token', token);
        this.setState({
            isLoading: false,
        });
        this.props.getUser();
        this.props.handleCloseModal();
    };

    toggleShow = () => {
        this.setState(state => ({ isLoginShown: !this.state.isLoginShown }));
    };

    handleLogin = async (username, password) => {
        this.setState({
            loginErrors: null,
            isLoading: true,
        });
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
                if (data.token) {
                    this.handleUserSuccess(data.token);
                } else {
                    console.log(data.message);
                    this.setState({
                        loginErrors: data.message,
                        isLoading: false,
                    });
                }
            });
    };

    handleRegistration = async (user) => {
        this.setState({
            registrationErrors: [],
            isLoading: true,
        });
        await fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response =>
                response.json(),
            )
            .then(data => {
                if (data.token) {
                    this.handleUserSuccess(data.token);
                } else {
                    console.log(data[0][0]['violation_message']);
                    this.setState({
                        registrationErrors: data[0],
                        isLoading: false,

                    });
                }
            });
    };

    renderForms = () => (
        <React.Fragment>
            {
                this.state.isLoginShown
                    ? <LoginForm
                    isLoading={this.state.isLoading}
                    errors={this.state.loginErrors}
                    onSubmit={this.handleLogin}
                />
                    : <RegistrationForm
                    isLoading={this.state.isLoading}
                    errors={this.state.registrationErrors}
                    onSubmit={this.handleRegistration}
                />
            }
            <AuthenticationNavigation isLoginShown={this.state.isLoginShown} onClick={this.toggleShow}/>
        </React.Fragment>
    );

    render() {
        return (
            this.renderForms()
        );
    };
}

export default AuthenticationHandler;