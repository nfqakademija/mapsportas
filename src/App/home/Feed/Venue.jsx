import React, { Component } from 'react';
import EventInVenue from '../../Modals/EventInVenue';
import SecondaryButton from "../../components/buttons/SecondaryButton";


class Venue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            sortedEvents: [],
        };
    }

    componentDidMount() {
        this.sortEvents(this.props.venue.sport_events);
    }

    sortEvents = (events) => {
        let newEvents = [];
        let now = new Date();
        for(let i = 0; i < events.length; i++) {
            let oldDate = new Date(events[i].date);
                for (let j = i + 1; j < events.length; j++) {
                    if (oldDate > new Date(events[j].date)) {
                        let event = events[j];
                        events[j] = events[i];
                        events[i] = event;
                    }
                }
            if(now < new Date(events[i].date) && newEvents.length < 5) {
                newEvents.push(events[i]);
            }
        }
        this.setState({ sortedEvents: newEvents });
    };

    toggleEvents = () => {
        const { opened } = this.state;

        this.setState({
            opened: !opened,
        });
    };

    render() {
        const {
            user,
            venue: {
                name,
                address,
                description,
                venue_photo,
            },
            getUser,
        } = this.props;
        const { opened, sortedEvents } = this.state;
        return (
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card my-2">
                    <img className="card-img-top" src={"/images/venues/" + venue_photo} alt="Image" />
                    <div className="card-body bg-dark text-white">
                        <h5 className="card-title my-4 text-info">{name}</h5>
                        <p className="card-text mb-2">Adresas: {address}</p>
                        <p className="card-text">Aprašymas: {description}</p>
                        {opened
                            ? <SecondaryButton handleClick={this.toggleEvents} text={"Paslėpti"}/>
                            : <SecondaryButton handleClick={this.toggleEvents} text={"Rodyti Susitikimus"}/>
                        }
                        {opened && sortedEvents.length > 0
                            ? <div className="d-flex justify-content-between mb-2 "><span>Data</span><span>Dalyviai</span></div>
                            : null
                        }
                        {opened
                            ? (sortedEvents.length > 0
                                    ? ( sortedEvents.map((event, i) =>
                                        <EventInVenue key={i}
                                                      event={event}
                                                      name={name}
                                                      address={address}
                                                      description={description}
                                                      photo={venue_photo}
                                                      user={user}
                                                      getUser={getUser}
                                        />
                                    ))
                                    : ( <div>Nėra renginių</div> )
                            )
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Venue;
