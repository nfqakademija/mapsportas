import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import propTypes from 'prop-types';

const AuthenticationNavigation = (props) => (
    <div>
        <Tabs centered={true} fullWidth={true}>
            { props.isLoginShown ?
                <Tab onClick={props.onClick} label="Register"/> :
                <Tab onClick={props.onClick} label="Login"/>
            }
        </Tabs>
    </div>
);

AuthenticationNavigation.propTypes = {
    isLoginShown: propTypes.bool.isRequired,
    onClick: propTypes.func.isRequired,
};

export default AuthenticationNavigation;