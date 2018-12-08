import React, { Component } from 'react';
import ErrorMessage from './partials/ErrorMessage';
import Spinner from "../components/Spinner";

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
        this.setState({
            isLoading: !this.state.isLoading,
        });
        this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        const { errors, isLoading } = this.props;
        console.log(errors);
        return (
            <React.Fragment>
                        <div className="card-header">
                            Login
                        </div>

                <div className="card-body">
                    <Spinner isLoading={isLoading}/>
                    {errors
                        ? <ErrorMessage text={errors}/>
                        : null
                    }
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
                            disabled={isLoading}
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