import React, { Component } from 'react';
import ErrorMessage from './partials/ErrorMessage';
import Spinner from "../components/Spinner";
import DatePicker from "react-datepicker/es";

class RegistrationForm extends Component {
    state = {
        startDate: new Date('2001-01-01'),
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

    // handleDateChange = (date) => {
    //     this.setState({
    //         startDate: date,
    //         user: {
    //             birthDate: date,
    //         }
    //     });
    // };

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
                            <label>Vardas</label>
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
                            <label>Pavardė</label>
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
                            <label>Vartotojo Vardas</label>
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
                            <label>El. Paštas</label>
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
                            <label>Slaptažodis</label>
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
                            <label>Pakartokite slaptažodį</label>
                            <input
                                name="repeatPassword"
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
                            <div>
                                <label>Gimimo Data</label>
                            </div>
                            {/*<DatePicker*/}
                                {/*className={ errors.birthDate*/}
                                    {/*? 'form-control form-control-danger'*/}
                                    {/*: 'form-control'*/}
                                {/*}*/}
                                {/*name="birthDate"*/}
                                {/*selected={this.state.startDate}*/}
                                {/*onChange={this.handleDateChange}*/}
                                {/*dateFormat="MMMM d, yyyy"*/}
                            {/*/>*/}
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
                            Registruotis
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default RegistrationForm;