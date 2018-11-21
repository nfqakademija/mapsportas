import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import AuthenticationHandler from '../Authentication/AuthenticationHandler';
import Home from '../home/Home';
import Profile from '../User/Profile/Profile';
import EventCreateForm from '../../App/home/Event/EventCreateForm';
import AddNewVenueForm from '../Admin/AddNewVenueForm';

class Routes extends Component {
    render() {
        const { userAuthorized, user } = this.props;
        return (
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/auth" render={() => userAuthorized ? <Redirect to="/"/> : <AuthenticationHandler/>}/>
                <Route exact path="/profile" render={() => (
                    userAuthorized
                        ? <Profile user={user}/>
                        : <Redirect to="/auth"/>
                )}
                />
                <Route exact path="/event/create" render={() => (
                    userAuthorized
                        ? <EventCreateForm/>
                        : <Redirect to="/auth"/>
                )}
                />
                <Route exact path="/admin" render={() => <AddNewVenueForm/> }/>
            </Switch>
        );
    };
}

export default Routes;