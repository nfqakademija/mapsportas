import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import Home from '../home/Home';
import Profile from '../User/Profile/Profile';
import AddNewVenueForm from '../Admin/AddNewVenueForm';
import Menu from '../menu/Menu';
import Events from '../Events/Events';
import Venues from '../Venues/Venues';
import Spinner from "../components/Spinner";
import {fetchUser} from "../../../assets/js/fetchPublic";

class Routes extends Component {
    state = {
        user: {},
        isAuthorized: false,
        isLoading: false,
        showAuthModal: false,
        showCreateEventModal: false,
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        this.setState({ isLoading: true });
        const token = localStorage.getItem('user_token');
        if (token) {
            fetchUser(token)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            user: response.data.user,
                            isAuthorized: true,
                        });
                    }},
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

    handleAuthModal = () => {
        this.setState({ showAuthModal: !this.state.showAuthModal })
    };

    handleCreateEventModal = () => {
        this.setState({ showCreateEventModal: !this.state.showCreateEventModal })
    };

    scrollToContent = () => {
        document.getElementById('events-list').scrollIntoView({behavior: 'smooth'});
    };

    render() {
        const { isAuthorized, user, isLoading, showAuthModal, showCreateEventModal } = this.state;
        return (
            !isLoading
            ?
                <React.Fragment>
                    <Menu
                        user={user}
                        isLoading={isLoading}
                        logout={this.logout}
                        showAuthModal={showAuthModal}
                        showCreateEventModal={showCreateEventModal}
                        handleAuthModal={this.handleAuthModal}
                        handleCreateEventModal={this.handleCreateEventModal}
                        getUser={this.getUser}
                    />
                    <Switch>
                        <Route exact path="/" render={() =>
                            <Home
                                user={user}
                                getUser={this.getUser}
                                scrollDown={this.scrollToContent}
                                handleCreateEventModal={this.handleCreateEventModal}
                                showCreateEventModal={showCreateEventModal}
                            />
                        }/>
                        <Route exact path="/profile" render={() => (
                            isAuthorized
                                ? <Profile/>
                                : <Redirect to="/"/>
                        )}
                        />
                        <Route exact path="/admin" render={() => <AddNewVenueForm/>}/>
                        <Route exact path="/events" render={() => <Events user={user} getUser={this.getUser}/>}/>
                        <Route exact path="/venues" render={() => <Venues user={user} getUser={this.getUser}/>}/>
                    </Switch>
                </React.Fragment>
                : <div style={{
                    position: 'absolute',
                    top: '45%',
                    right: '45%'
                }}>
                    <Spinner isLoading={isLoading}/>
                </div>
        );

    };
}

export default Routes;