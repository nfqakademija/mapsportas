import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';
import { Redirect } from 'react-router-dom';

class AuthenticationHandler extends Component {
    state = {
        isLoginShown: true,
        loginErrors: [],
        registrationErrors: [],
        authorized: false,
        isLoading: false,
    };

    componentDidMount() {
        this.props.onLoad();
    }

    handleUserSuccess = (token) => {
        localStorage.setItem('user_token', token);
        this.setState({
            authorized: true,
            isLoading: false,
        });
        this.props.getUser();
    };

    toggleShow = () => {
        this.setState(state => ({ isLoginShown: !this.state.isLoginShown }));
    };

    handleLogin = async (username, password) => {
        this.setState({
            isLoading: !this.state.isLoading,
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
                    this.setState({ loginErrors: data });
                }
            });
    };

    handleRegistration = async (user) => {
        this.setState({
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
                    this.setState({ registrationErrors: data });
                }
            });
    };

    renderForms = () => (
        <div className="container col-md-5 mt-5" id="auth-form">
            <div className="card">
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
            </div>
        </div>
    );

    render() {
        return (
            this.state.authorized
                ? <Redirect to="/"/>
                : this.renderForms()
        );
    };
}

export default AuthenticationHandler;