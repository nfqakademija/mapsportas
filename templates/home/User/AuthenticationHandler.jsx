import React, {Component} from 'react';
import propTypes from 'prop-types';
import RegistrationPage from './RegistrationPage';
import LoginForm from './LoginForm';
import AuthenticationNavigation from './partials/AuthenticationNavigation';

class AuthenticationHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: null,
                surname: null,
                dateOfBirth: null,
                email: null,
                password: null,
            },
            token: null,
        };
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
        })
            .then(response => {
                return response.json();
            }).then(data => {
                this.setState({
                    token: data
                });
            }).catch(error => {
                console.log(error);
            });
    };

    handleRegistration = () => {
        console.log(this);
    };

    render() {
        const isLoginShown = this.props.isLoginShown;
        return (
            <React.Fragment>
                {
                    isLoginShown ?
                        <LoginForm user={this.state.user} onSubmit={this.handleLogin}/> :
                        <RegistrationPage user={this.state.user} onSubmit={this.handleRegistration}/>
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