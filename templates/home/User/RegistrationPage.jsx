import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return <div>
            <AppBar position="static">
                <div>
                    Bla
                </div>
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
                <Button
                    type="Submit"
                    fullWidth={true}
                    color="primary"
                >
                    Register
                </Button>
            </form>
        </div>
    }
}

export default RegistrationPage;