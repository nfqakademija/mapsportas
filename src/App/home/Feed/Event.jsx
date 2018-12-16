import React, { Component } from 'react';
import axios from 'axios';
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Spinner from "../../components/Spinner";
import AuthenticationHandler from "../../Authentication/AuthenticationHandler";
import MainModal from "../../components/MainModal";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: '',
            participiants: this.props.event.applyed_users.length,
            alreadyInEvent: false,
            isAuthModalOpen: false,
        };
    }
    componentDidMount() {
        this.isUserInEvent();
    }

    handleAuthModal = () => {
        this.setState({ isAuthModalOpen: !isAuthModalOpen });
    };

    handleApplication = (id) => {
        this.setState({ isLoading: true });
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
                        participiants: this.state.participiants + 1,
                        message: response.data,
                        isLoading: false,
                        alreadyInEvent: true,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    message: error.response.data,
                    isLoading: false,
                });
            });
    };

    cancelApplication = () => {
        const { event: { id } } = this.props;
        this.setState({ isLoading: true });
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
                    participiants: this.state.participiants - 1,
                    isLoading: false,
                });
                this.props.onLeave(id);
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

    render() {
        const {
            user,
            getUser,
            event: {
                sport_type,
                sport_venue,
                creator,
                date,
                id,
                max_members,
            },
        } = this.props;
        const {
            isLoading,
            participiants,
            message,
            alreadyInEvent,
        } = this.state;
        return (
            <div className="col-12 col-md-6 col-lg-4">
                <div className="single-event-table mb-5" style={{
                    border: 'rgb(56, 177, 67) solid 3px'
                }}>
                    <img className="myWidth" src={"/images/venues/" + sport_venue.venue_photo} alt=""></img>
                    <div className="event-table-content mt-3">
                        <h2 className="event">
                            {sport_venue.name}
                        </h2>
                        <h5>{sport_type.name}</h5>
                        <ul className="event-data">
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Organizatorius: {creator.username}
                            </li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i>
                                Dalyviai: {participiants}/{max_members}</li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Laikas: {date}</li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Adresas: {sport_venue.address}</li>
                        </ul>
                        <div className="ml-3 my-3">
                            {Object.keys(user).length !== 0
                                ? alreadyInEvent
                                    ? <PrimaryButton handleClick={this.cancelApplication} text={'Nebedalyvauti'}/>
                                    : <PrimaryButton handleClick={this.handleApplication.bind(this, id)} text={"Dalyvauti"}/>
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
                            }
                        </div>
                        <Spinner isLoading={isLoading}/>
                        <div className="text-center my-3">
                            {message.hasOwnProperty('success_message')
                                ? <span style={{ color: 'green' }}>{message.success_message}</span>
                                : <span style={{ color: 'red' }}>{message.error_message}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Event;