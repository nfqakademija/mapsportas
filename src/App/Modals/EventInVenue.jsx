import React, { Component } from 'react';
import MainModal from "../components/MainModal";
import EventModalContent from "./EventModalContent";

class EventInVenue extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showEventModal: false,
            showAuthModal: false,
            participiants: this.props.event.applyed_users.length,
        };
    }

    handleEventModal = () => {
        this.setState({ showEventModal: !this.state.showEventModal });
    };

    handleAuthModal = () => {
        this.setState({ showAuthModal: !this.state.showAuthModal });
    };

    handleParticipiants = (i) => {
        this.setState({
           participiants: this.state.participiants + i,
        });
    };

    render () {
        const { event, name, description, photo, address, user, getUser } = this.props;
        const { participiants, showEventModal, showAuthModal } = this.state;
        return (
            <div className="myPointer">
                <div className="d-flex justify-content-between border-bottom mb-2" onClick={this.handleEventModal}>
                    <span>{event.date}</span>
                    <span>{participiants}/{event.max_members}</span>
                </div>
                <MainModal
                    isOpen={showEventModal}
                    handleCloseModal={this.handleEventModal}
                    content={
                       <EventModalContent
                           participiants={participiants}
                           name={name}
                           description={description}
                           photo={photo}
                           address={address}
                           user={user}
                           event={event}
                           handleParticipiants={this.handleParticipiants}
                           isAuthModalOpen={showAuthModal}
                           handleAuthModal={this.handleAuthModal}
                           getUser={getUser}
                       />
                    }
                />
            </div>
        );
    }
}

export default EventInVenue;
