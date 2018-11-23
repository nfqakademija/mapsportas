import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from './partials/ErrorMessage';
import Loader from 'react-loader-spinner';

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
                {
                    errors.map((error) => {
                        return <ErrorMessage text={this.normalizeString(error)}/>;
                    })
                }
                {
                    isLoading
                        ? <Loader type="Oval" color="#00BFFF" height="100" width="100"/>
                        : null
                }
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
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
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField
                                name="birthDate"
                                type="date"
                                label="Birthday"
                                onChange={this.handleChange}
                            />
                        </FormControl>
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