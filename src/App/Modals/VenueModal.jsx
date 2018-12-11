import React, { Component } from 'react';
import MainModal from "../components/MainModal";
import EventModalContent from "./EventModalContent";

class VenueModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            participiants: this.props.event.applyed_users.length,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleParticipiants = (i) => {
        this.setState({
           participiants: this.state.participiants + i,
        });
    };

    render () {
        console.log(this.props.event);
        const { event, name, description, photo, address, user } = this.props;
        const { participiants, showModal } = this.state;
        return (
            <div className="myPointer">
                <div className="d-flex justify-content-between border-bottom mb-2" onClick={this.handleOpenModal}>
                    <span>{event.date}</span>
                    <span>{participiants}/{event.max_members}</span>
                </div>
                <MainModal
                    isOpen={showModal}
                    handleCloseModal={this.handleCloseModal}
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
                       />
                    }
                />
            </div>
        );
    }
}

export default VenueModal;
