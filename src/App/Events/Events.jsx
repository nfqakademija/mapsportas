import React, { Component } from 'react';
import Event from '../home/Feed/Event';
import axios from 'axios';
import {fetchEventsUpcoming} from "../../../assets/js/fetchPublic";

class Events extends Component {
    state = {
        events: [],
    };

    async componentDidMount() {
        this.fetchAllEvents(30);
        window.addEventListener('scroll', this.handleScroll);
    }

    fetchAllEvents = async (i) => {
        await fetchEventsUpcoming(i)
            .then((response) => {
                this.setState({ events: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        ;
    };

    handleScroll = () => {

    }

    render() {
        const { events } = this.state;
        const { user } = this.props;
        return (
                <div className="fitness-pricing-table-area section-padding-100-0"
                    onScroll={this.handleScroll}
                    ref={(scroller) =>{
                        this.scroller = scroller;
                    }}
                >
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
        );
    }
}

export default Events;