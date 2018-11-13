import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationHandler from '../Authentication/AuthenticationHandler';
import Home from '../home/Home';
import Profile from '../User/Profile/Profile';
import EventCreateForm from '../../App/home/Event/EventCreateForm';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/auth" render={() => <AuthenticationHandler/>}/>
                <Route exact path="/profile" render={() => <Profile {...this.props}/>}/>
                <Route exact path="/event/create" render={() => <EventCreateForm/>}/>
            </Switch>
        );
    };
}

export default Routes;