import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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
        return (
            <React.Fragment>
                <AppBar position="static">
                    <div>
                        Bla
                    </div>
                </AppBar>
                <form onSubmit={this.onSubmit}>
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
                        Login
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginForm;