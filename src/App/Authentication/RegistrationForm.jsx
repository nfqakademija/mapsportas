import React, { Component } from 'react';
import ErrorMessage from './partials/ErrorMessage';
import Spinner from "../components/Spinner";

class RegistrationForm extends Component {
    state = {
        user: {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            birthDate: '',
        },
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            { user: { ...this.state.user, [name]: value } },
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.user);
    };

    normalizeString = (message) => {
        const string = Object.entries(message)[0];
        return `${string[0]}: ${string[1]}`;
    };

    render() {
        const { errors, isLoading } = this.props;
        return (
            <React.Fragment>
                <div className="card-header">
                    Registration
                </div>
                <Spinner isLoading={isLoading}/>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                        return error.field == 'name'
                                            ? <ErrorMessage key={i} text={error.violation_message}/>
                                            : null
                                })
                            }
                            <label>Name</label>
                            <input
                                name="name"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.name
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'surname'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Surname</label>
                            <input
                                name="surname"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.surname
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'username'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Username</label>
                            <input
                                name="username"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.username
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'email'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Email</label>
                            <input
                                name="email"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.error_message
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'password'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.password
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Repeat password</label>
                            <input
                                type="password"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.password
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'birthDate'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Date of birth</label>
                            <input
                                name="birthDate"
                                type="date"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.birthDate
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            type="Submit"
                            disabled={isLoading}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default RegistrationForm;