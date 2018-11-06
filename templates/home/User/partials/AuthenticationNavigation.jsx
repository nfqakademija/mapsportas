import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

const AuthenticationNavigation = (props) => (
    <Tabs centered={true} fullWidth={true}>
        { props.isLoginShown ?
            <Tab component={Link} to="/register" onClick={props.onClick} label="Register"/> :
            <Tab component={Link} to="/login" onClick={props.onClick} label="Login"/>
        }
    </Tabs>
);

AuthenticationNavigation.propTypes = {
    isLoginShown: propTypes.bool.isRequired,
    onClick: propTypes.func.isRequired,
};

export default AuthenticationNavigation;