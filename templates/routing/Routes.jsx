import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import AuthenticationPage from '../home/User/AuthenticationPage';

class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" component={AuthenticationPage}/>
            </Switch>
        );
    };
}

export default Routes;