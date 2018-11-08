import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegistrationForm extends Component {
    state = {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        birthDate: '',
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState(
            {[name]: value}
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.user);
    };

    render() {
        return (
            <React.Fragment>
                <AppBar position="static">
                    Registration
                </AppBar>
                <form onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="name"
                            label="Name"
                            onChange={this.handleChange}
                            error={!!this.props.errors.name}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="surname"
                            label="surname"
                            onChange={this.handleChange}
                            error={!!this.props.errors.surname}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="username"
                            label="username"
                            onChange={this.handleChange}
                            error={!!this.props.errors.username}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            type="email"
                            name="email"
                            label="email"
                            onChange={this.handleChange}
                            error={!!this.props.errors.email}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="password"
                            type="password"
                            label="password"
                            onChange={this.handleChange}
                            error={!!this.props.errors.password}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="repeatPassword"
                            type="password"
                            label="password"
                            onChange={this.handleChange}
                            error={!!this.props.errors.password}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            name="birthDate"
                            type="date"
                            label="Birthday"
                            onChange={this.handleChange}
                            error={!!this.props.errors.birthDate}
                        />
                    </FormControl>
                    <Button
                        type="Submit"
                        fullWidth={true}
                        color="primary"
                    >
                        Register
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default RegistrationForm;