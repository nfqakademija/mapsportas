import React, { Component } from 'react';
import PrimaryButton from "../components/buttons/PrimaryButton";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import axios from "axios";
import MainModal from "../components/MainModal";
import AuthenticationHandler from "../Authentication/AuthenticationHandler";


class EventModalContent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            message: '',
            alreadyInEvent: false,
        };
    }

    componentDidMount() {
        this.isUserInEvent();
    }

    handleApplication = (id) => {
        this.setState({
            isLoading: true,
            message: '',
        });
        const {
            handleParticipiants,
        }
        = this.props;
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
                    this.setState({
                        message: response.data,
                        isLoading: false,
                        alreadyInEvent: true,
                    });
                    handleParticipiants(1);
                }
            })
            .catch((error) => {
                this.setState({
                    message: error.response.data,
                    isLoading: false
                });
            });
    };

    cancelApplication = () => {
        const { event: { id }, handleParticipiants } = this.props;
        this.setState({
            isLoading: true,
            message: '',
        });
        axios
            .delete(`/api/sport/event/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                },
            })
            .then((response) => {
                this.setState({
                    message: response.data,
                    alreadyInEvent: false,
                    isLoading: false,
                });
                handleParticipiants(-1);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoading: false,
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
    };



    render () {
        const { name, description, photo, address, user, event, participiants, handleAuthModal, isAuthModalOpen } = this.props;
        const { message, isLoading, alreadyInEvent } = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 mb-3 text-center">
                        <img className="myWidth maxWidth-360" src={"/images/venues/" + photo}/>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <h4>{name}</h4>
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <span>Data ir Laikas:</span> <span>{event.date}</span>
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <span>Adresas:</span> <span>{address}</span>
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <span>Dalyviai:</span> <span>{participiants}/{event.max_members}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        Aikštelės aprašymas:
                    </div>
                    <div className="col-12">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="text-center">
                    {alreadyInEvent
                        ? <PrimaryButton handleClick={this.cancelApplication} text={'Nebedalyvauti'}/>
                        :  Object.keys(user).length !== 0
                            ? <PrimaryButton handleClick={this.handleApplication.bind(this, event.id)} text={"Dalyvauti"}/>
                            : (
                                <React.Fragment>
                                <PrimaryButton handleClick={handleAuthModal} text={"Prisijunk"}/>
                                <MainModal
                                    isOpen={isAuthModalOpen}
                                    handleCloseModal={handleAuthModal}
                                    content={
                                        <AuthenticationHandler
                                            handleCloseModal={handleAuthModal}
                                        />}
                                />
                                </React.Fragment>
                            )

                    }
                </div>
                <Spinner isLoading={isLoading}/>
                <Message message={message}/>
            </React.Fragment>
        );
    }
}

export default EventModalContent;