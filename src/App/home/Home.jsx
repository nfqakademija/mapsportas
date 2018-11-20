import React, { Component } from 'react';
import Venue from './Feed/Venue';
import Event from './Feed/Event';
import PeopleFeed from './Feed/PeopleFeed';
import { fetchEventsUpcoming, fetchVenuesLimited } from '../../../assets/js/fetchPublic';

class Home extends Component {
    state = {
        venues: [],
        events: [],
        people: [],
    };

    async componentDidMount() {
        this.fetchAllEvents();
        this.fetchAllVenues();
    }

    fetchAllEvents = async () => {
        await fetchEventsUpcoming()
            .then((response) => {
                this.setState({ events: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        ;
    };

    fetchAllVenues = async () => {
        await fetchVenuesLimited()
            .then((response) => {
                this.setState({ venues: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { events, venues } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        {
                            venues.map((venue) => {
                                return <Venue key={venue.id} venue={venue}/>;
                            })
                        }
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            events.map((event) => {
                                return (
                                    <Event key={event.id} event={event}/>
                                );
                            })
                        }
                    </div>
                </div>
                {/*<PeopleFeed />*/}
            </React.Fragment>
        );
    }
}

export default Home;