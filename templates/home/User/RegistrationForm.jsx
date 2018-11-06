import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegistrationPage extends Component {
    state = {
        user: {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            birthDate: '',
        }
    };

    handleChange = (event) => {
        const user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({user});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.user);
    };

    render() {
        return <React.Fragment>
            <AppBar position="static">
                    Registration
            </AppBar>
            <form onSubmit={this.handleSubmit}>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="name"
                        label="Name"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="surname"
                        label="surname"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="username"
                        label="username"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="email"
                        label="email"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="password"
                        type="password"
                        label="password"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="repeatPassword"
                        type="password"
                        label="password"
                        onChange={this.handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        name="birthDate"
                        type="date"
                        label="Birthday"
                        onChange={this.handleChange}
                        required
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
    }
}

export default RegistrationPage;