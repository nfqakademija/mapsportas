import React, { Component } from 'react';
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import ApplicationButton from "../components/ApplicationButton";


class EventModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isLoading: false,
        };
    }

    setMessage = (givenMessage) => {
        this.setState({ message: givenMessage })
    };


    toggleLoading = () => {
        this.setState({ isLoading: !this.state.isLoading })
    };

    render () {
        const { name, description, photo, address, user, event, participiants, getUser, handleParticipiants } = this.props;
        const { message, isLoading } = this.state;
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
                    <ApplicationButton
                        user={user}
                        getUser={getUser}
                        setMessage={this.setMessage}
                        handleParticipiants={handleParticipiants}
                        event={event}
                        toggleLoading={this.toggleLoading}
                    />
                </div>
                <Spinner isLoading={isLoading}/>
                <Message message={message}/>
            </React.Fragment>
        );
    }
}

export default EventModalContent;