import React, { Component } from 'react';
import Event from '../home/Feed/Event';
import { fetchEventsFiltered, fetchSports } from "../../../assets/js/fetchPublic";
import FilterBar from "./filterBar";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";

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
        let first = page * perPage;
        let data = {
            perPage: perPage,
            first: first,
            sportId: sportId,
            from: from,
            to: to,
            min: min,
            max: max
        };

        await axios
            .post('/api/public/sport/events', data)
            .then((response) => {
                this.setState({events: this.state.events.concat(response.data)});
                this.setState({page: page + 1});
                console.log(`puslapis:` + page);
            })
            .catch((error) => {
                this.setState({
                    errors: error,
                });
            });
    };

    setFilters = (sportId, from, to, min, max) => {
        this.state.sportId = sportId;
        this.state.from = from;
        this.state.to = to;
        this.state.min = min;
        this.state.max = max;
        this.state.page = 0;
        this.filterEvents();
    };

    filterEvents = () => {
        this.setState({events:[]});
    };

    render() {
        const { events } = this.state;
        const { user } = this.props;
        return (
            <div className="fitness-pricing-table-area section-padding-100-0">
                <div className="container">
                    <FilterBar setFilters={this.setFilters}/>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.fetchEvents}
                        hasMore={true || false}
                        loader={
                            <div className="text-center" key={0}>
                                <div className="btn btn-info mb-5">Loading ...</div>
                            </div>}
                >
                            <div className="row justify-content-center">
                                {
                                    events.map((event) => {
                                        return (
                                            <Event key={event.id} event={event} user={user}/>
                                        );
                                    })
                                }
                            </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default Events;