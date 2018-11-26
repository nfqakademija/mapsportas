import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Menu from './menu/Menu';
import Routes from './routing/Routes';
import axios from 'axios';
import Slider from "./home/Slider/Slider";

class App extends Component {
    state = {
        user: {},
        isAuthorized: false,
        isLoading: true,
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        const token = localStorage.getItem('user_token');
        if (token) {
            await axios
                .get(
                    '/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
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
                    this.setState({
                        isAuthorized: false,
                    });
                })
            ;
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { user, isAuthorized, isLoading } = this.state;
        return (

            <BrowserRouter>
                <React.Fragment>
                    <Menu user={user} />
                    <Slider />

                    <Routes user={user} userAuthorized={isAuthorized} />
                </React.Fragment>
            </BrowserRouter>

        );
    }
}

export default App;