import React, { Component } from 'react';
import Venue from './Feed/Venue';
import Event from './Feed/Event';
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


    render() {
        const { events } = this.state;
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="py-5">
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
            </React.Fragment>
        );
    }
}

export default Home;
