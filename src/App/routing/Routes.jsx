import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import axios from 'axios';
import AuthenticationHandler from '../Authentication/AuthenticationHandler';
import Home from '../home/Home';
import Profile from '../User/Profile/Profile';
import EventCreateForm from '../../App/home/Event/EventCreateForm';
import AddNewVenueForm from '../Admin/AddNewVenueForm';
import Menu from '../menu/Menu';
import Events from '../Events/Events';
import Venues from '../Venues/Venues';
import Slider from '../home/Slider/Slider';

class Routes extends Component {
    state = {
        user: {},
        isAuthorized: false,
        isLoading: false,
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        this.setState({ isLoading: true });
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
        }
        this.setState({ isLoading: false });
    };

    logout = () => {
        localStorage.removeItem('user_token');
        this.setState({
            isAuthorized: false,
            user: {},
        });
    };

    scrollToContent = () => {
        document.getElementById('auth-form').scrollIntoView({behavior: 'smooth'});
    };

    render() {
        const { isAuthorized, user, isLoading } = this.state;
        return (
            <React.Fragment>
                <Menu user={user} isLoading={isLoading} logout={this.logout}/>
                <Slider />
                <Switch>
                    <Route exact path="/" render={() => <Home user={user}/>}/>
                    <Route exact path="/auth"
                           render={() => isAuthorized ? <Redirect to="/"/> :
                               <AuthenticationHandler onLoad={this.scrollToContent} getUser={this.getUser}/>}/>
                    <Route exact path="/profile" render={() => (
                        isAuthorized
                            ? <Profile />
                            : <Redirect to="/auth"/>
                    )}
                    />
                    <Route exact path="/event/create" render={() => (
                        isAuthorized
                            ? <EventCreateForm/>
                            : <Redirect to="/auth"/>
                    )}
                    />
                    <Route exact path="/admin" render={() => <AddNewVenueForm/> }/>
                    <Route exact path="/events" render={() => <Events user={user}/> }/>
                    <Route exact path="/venues" render={() => <Venues user={user}/> }/>
                </Switch>
            </React.Fragment>
        );
    };
}

export default Routes;