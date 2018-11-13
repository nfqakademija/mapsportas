import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Theme from './home/MuiTheme/theme';
import Menu from './menu/Menu';
import Routes from './routing/Routes';
import axios from 'axios';

class App extends Component {
    state = {
        user: {},
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        await axios
            .get(
                '/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                })
            .then((response) => {
                    this.setState({
                        user: response.data.user,
                    });
                },
            )
            .catch((error) => console.log(error))
        ;
    };

    render() {
        const { user } = this.state;
        return (
            <MuiThemeProvider theme={Theme}>
                <BrowserRouter>
                    <div className="container">
                        <Menu user={user}/>
                        <Routes user={user}/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;