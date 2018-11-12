import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from './/partials/ErrorMessage';

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

    render() {
        const { errors } = this.props;
        return (
            <React.Fragment>
                <div className="card-header">
                    Registration
                </div>
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
                            <ErrorMessage text={errors.name}/>
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
                            <ErrorMessage text={errors.surname}/>
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
                            <ErrorMessage text={errors.username}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                onChange={this.handleChange}
                                required={true}
                                className={ errors.email
                                    ? 'form-control form-control-danger'
                                    : 'form-control'
                                }
                            />
                            <ErrorMessage text={errors.email}/>
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
                            <ErrorMessage text={errors.password}/>
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
                            <ErrorMessage text={errors.password}/>
                        </div>
                        <FormControl margin="normal" fullWidth={true}>
                            <TextField
                                name="birthDate"
                                type="date"
                                label="Birthday"
                                onChange={this.handleChange}
                                error={!!errors.birthDate}
                            />
                        </FormControl>
                        <button
                            className="btn btn-primary btn-block"
                            type="Submit"
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