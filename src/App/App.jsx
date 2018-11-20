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
        isAuthorized: false,
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
                    if (response.status === 200) {
                        this.setState({
                            user: response.data.user,
                            isAuthorized: true,
                        });
                    }
                },
            )
            .catch((error) => {
                localStorage.removeItem('user_token');
                this.setState({
                    isAuthorized: false,
                });
            })
        ;
    };

    render() {
        const { user, isAuthorized } = this.state;
        return (

            <BrowserRouter>
                <div>
                    <Menu user={user}/>
                    <Routes user={user} userAuthorized={isAuthorized}/>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;