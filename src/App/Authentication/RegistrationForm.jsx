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
        inputs: [
            'name', 'surname','username', 'email', 'password', 'repeatPassword', 'birthDate',
        ],
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

    renderInput = (fieldName, key, errors) => {
        let label;
        let type = "text";
        switch (fieldName) {
            case "name":
                label = "Vardas";
                break;
            case "surname":
                label = "Pavardė";
                break;
            case "username":
                label = "Vartotojo Vardas";
                break;
            case "email":
                label = "El. Paštas";
                break;
            case "password":
                label = "Slaptažodis";
                type = "password";
                break;
            case "repeatPassword":
                label = "Pakartokite slaptažodį";
                type = "password";
                break;
            case "birthDate":
                label = "Gimimo data";
                type = "date";
                break;
        }
        return (
            <div key={key} className="form-group">
                {
                    errors.map((error, i) => {
                        return error.field === fieldName
                            ? <ErrorMessage key={i} text={error.violation_message}/>
                            : null
                    })
                }
                <label>{label}</label>
                <input
                    type={type}
                    name={fieldName}
                    onChange={this.handleChange}
                    required={true}
                    className={errors[{fieldName}]
                        ? 'form-control form-control-danger'
                        : 'form-control'
                    }
                />
            </div>
        );
    };

    render() {
        const { errors, isLoading } = this.props;
        const { inputs } = this.state;
        return (
            <React.Fragment>
                <div className="card-header">
                    Registration
                </div>
                <Spinner isLoading={isLoading}/>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        {inputs.map((value, key) => (
                            this.renderInput(value, key, errors)
                        ))}
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