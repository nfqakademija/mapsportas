import React, {Component} from 'react';
import AuthenticationHandler from './AuthenticationHandler';

class AuthenticationPage extends Component {
    state  = {
        isLoginShown: true,
    };

    toggleShow = () => {
        console.log(this);
        this.setState(state => ({isLoginShown: !this.state.isLoginShown}));
    };

    render() {
        return <React.Fragment>
            <AuthenticationHandler isLoginShown = {this.state.isLoginShown} onChange={this.toggleShow}/>
        </React.Fragment>
    }
}

export default AuthenticationPage;