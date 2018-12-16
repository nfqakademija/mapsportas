import React, { Component } from 'react';
import Spinner from "../../components/Spinner";
import ApplicationButton from "../../components/ApplicationButton";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            participiants: this.props.event.applyed_users.length,
            isLoading: false,
        };
    }

    setMessage = (givenMessage) => {
        this.setState({ message: givenMessage })
    };

    handleParticipiants = (i) => {
        this.setState({ participiants: this.state.participiants + i })
    };

    toggleLoading = () => {
        this.setState({ isLoading: !this.state.isLoading })
    };

    render() {
        const {
            user,
            getUser,
            event,
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
                            <ApplicationButton
                                user={user}
                                getUser={getUser}
                                setMessage={this.setMessage}
                                handleParticipiants={this.handleParticipiants}
                                event={event}
                                toggleLoading={this.toggleLoading}
                            />
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