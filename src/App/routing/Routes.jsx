import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthenticationHandler from '../Authentication/AuthenticationHandler';
import Home from '../home/Home';
import Profile from '../User/Profile/Profile';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/auth" render={() => <AuthenticationHandler/>}/>
                <Route exact path="/profile" render={() => <Profile/>}/>
                {/*<Route path="/event/create" component={Event}/>*/}
            </Switch>
        );
    };
}

export default Routes;