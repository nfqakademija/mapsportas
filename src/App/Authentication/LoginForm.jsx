import React, { Component } from 'react';
import ErrorMessage from './/partials/ErrorMessage';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        const { errors } = this.props;
        return (
            <React.Fragment>
                <div className="card-header">
                    Login
                    { errors.length > 0 } {
                    <ErrorMessage text={errors.error_message}/>
                }
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                className="form-control"
                                name="username"
                                onChange={this.handleChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                required={true}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            type="Submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginForm;