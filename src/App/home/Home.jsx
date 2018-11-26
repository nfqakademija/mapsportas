import React, { Component } from 'react';
import Slider from './slider/Slider';
import Venue from './Feed/Venue';
import Event from './Feed/Event';
import PeopleFeed from './Feed/PeopleFeed';
import ModalLoader from '../modal/ModalLoader';
import { fetchEventsUpcoming, fetchVenuesLimited } from '../../../assets/js/fetchPublic';

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
        await fetchEventsUpcoming(8,1)
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
        const { events, venues, isLoading } = this.state;
        const { user } = this.props;
        return (
            <React.Fragment>
                {
                    isLoading
                        ? <ModalLoader/>
                        : null
                }
                <Slider />
                <div className="container">
                    <div className="row">
                        {
                            venues.map((venue) => {
                                return <Venue key={venue.id} venue={venue}/>;
                            })
                        }
                    </div>
                </div>
                <div className="fitness-pricing-table-area section-padding-100-0 bg-img bg-overlay bg-fixed"
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