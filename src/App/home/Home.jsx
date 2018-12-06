import React, { Component } from 'react';
import Slider from './Slider/Slider';
import Venue from './Feed/Venue';
import Event from './Feed/Event';
import PeopleFeed from './Feed/PeopleFeed';
import { fetchEventsUpcoming, fetchVenues } from '../../../assets/js/fetchPublic';

class Home extends Component {
    state = {
        venues: [],
        events: [],
        people: [],
        isLoading: true,
    };

    async componentDidMount() {
        this.fetchAllEvents();
        this.fetchAllVenues();
        this.setState({ isLoading: false });
    }

    fetchAllEvents = async () => {
        await fetchEventsUpcoming(12,0)
            .then((response) => {
                this.setState({ events: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        ;
    };

    fetchAllVenues = async () => {
        await fetchVenues(8,0,0)
            .then((response) => {
                this.setState({ venues: response.data.sportVenues });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { events, venues } = this.state;
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        {
                            venues.map((venue) => {
                                return <Venue key={venue.id} venue={venue} user={user}/>;
                            })
                        }
                    </div>
                </div>
                <div className="py-5 bg-img bg-overlay bg-fixed"
                     style={{ backgroundImage: `url(img/bg-img/bg-7.jpg)` }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            {
                                events.map((event) => {
                                    return (
                                        <Event key={event.id} event={event} user={user}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                {/*<PeopleFeed />*/}
            </React.Fragment>
        );
    }
}

export default Home;
