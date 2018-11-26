import React, { Component } from 'react';
import Event from '../home/Feed/Event';
import { fetchEventsUpcoming, fetchSports } from "../../../assets/js/fetchPublic";
import FilterBar from "./filterBar";

class Events extends Component {
    state = {
        events: [],
        page: 0,
        perPage: 12,
        sportId: null,
        from: null,
        to: null,
        min: null,
        max: null,
    };

    async componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = async () => {
        const {
            perPage,
            page,
            sportId,
            from,
            to,
            min,
            max,
        } = this.state;
        await fetchEventsUpcoming(perPage, page * perPage + 1)
            .then((response) => {
                this.setState({events: this.state.events.concat(response.data)});
                this.setState({page: this.state.page + 1});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    setFilters = (sportId, from, to, min, max) => {
        this.state.sportId = sportId;
        this.state.from = from;
        this.state.to = to;
        this.state.min = min;
        this.state.max = max;
        this.filterEvents();
    };

    filterEvents = () => {

    };

    render() {
        const { events } = this.state;
        const { user } = this.props;
        return (
                <div className="fitness-pricing-table-area section-padding-100-0">
                    <div className="container">
                        <FilterBar setFilters={this.setFilters}/>
                        <div className="row justify-content-center">
                            {
                                events.map((event) => {
                                    return (
                                        <Event key={event.id} event={event} user={user}/>
                                    );
                                })
                            }
                            <div>
                                <button className="btn fitness-btn btn-2 m-2 mb-5" onClick={ this.fetchEvents }>Rodyti Daugiau</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Events;