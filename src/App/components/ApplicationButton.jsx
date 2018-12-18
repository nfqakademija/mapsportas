import React, { Component } from 'react';
import PrimaryButton from "./buttons/PrimaryButton";
import MainModal from "./MainModal";
import AuthenticationHandler from "../Authentication/AuthenticationHandler";
import axios from "axios";

class ApplicationButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadyInEvent: false,
            isAuthModalOpen: false,
            isLoading: true,
            isFutureEvent: false,
        };
    }


    componentDidUpdate(prevProps) {
        if(!prevProps.user.id && this.props.user.id) {
            this.isUserInEvent();
        }
    };

    componentDidMount() {
        this.isUserInEvent();
        this.checkIfEventFinished(this.props.event.date);
    }

    handleAuthModal = () => {
        this.setState({ isAuthModalOpen: !this.state.isAuthModalOpen });
    };

    handleApplication = (id) => {
        this.props.toggleLoading();
        axios
            .post('/api/sport/event/apply', {
                    sportEvent: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                })
            .then((response) => {
                if (response.status === 201) {
                    this.props.setMessage(response.data);
                    this.props.handleParticipiants(1);
                    this.props.toggleLoading();
                    this.setState({
                        alreadyInEvent: true,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    message: error.response.data,
                });
                this.props.toggleLoading();
            });
    };

    cancelApplication = () => {
        const {
            event: {
                id
            },
            setMessage,
            handleParticipiants,
            toggleLoading
        } = this.props;
        toggleLoading();
        axios
            .delete(`/api/sport/event/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data);
                handleParticipiants(-1);
                toggleLoading();
                this.setState({
                    alreadyInEvent: false,
                });
            });
    };

    isUserInEvent = () => {
        const {
            user: {
                id,
            },
            event: {
                applyed_users,
            },
        } = this.props;
        applyed_users.map((application) => {
            if (id == application.user.id) {
                this.setState({ alreadyInEvent: true})
            }
        });
        this.setState({ isLoading: false })
    };

    checkIfEventFinished = (date) => {
        let now = new Date();
        date = new Date(date);
        if (date > now) {
            this.setState({ isFutureEvent: true })
        }
    };

    render () {
        const { user, getUser, event } = this.props;
        const { isAuthModalOpen, alreadyInEvent, isFutureEvent } = this.state;
        return (
            <React.Fragment>
                {isFutureEvent
                    ? Object.keys(user).length !== 0
                        ? alreadyInEvent
                            ? <PrimaryButton handleClick={this.cancelApplication} text={'Nebedalyvauti'}/>
                            : <PrimaryButton handleClick={this.handleApplication.bind(this, event.id)} text={"Dalyvauti"}/>
                        :
                        <React.Fragment>
                            <PrimaryButton handleClick={this.handleAuthModal} text={"Prisijunk"}/>
                            <MainModal
                                isOpen={isAuthModalOpen}
                                handleCloseModal={this.handleAuthModal}
                                content={
                                    <AuthenticationHandler
                                        handleCloseModal={this.handleAuthModal}
                                        getUser={getUser}
                                    />}
                            />

                        </React.Fragment>
                    : null
                }
            </React.Fragment>
        );
    }
}

export default ApplicationButton;