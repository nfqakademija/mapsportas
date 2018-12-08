import React, { Component } from 'react';
import Event from '../home/Feed/Event';
import { fetchEventsFiltered, getEventsCount, getVenuesCount } from "../../../assets/js/fetchPublic";
import FilterBar from "./filterBar";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";

class Events extends Component {
    state = {
        events: [],
        page: 0,
        perPage: 6,
        sportId: 0,
        from: null,
        to: null,
        min: null,
        max: null,
        count: null,
        hasMore: true,
        letFetch: true
    };

    fetchEvents = async () => {
        const { perPage, page, sportId, from, to, min, max } = this.state;
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
        this.state.letFetch = false;
        await axios
            .post('/api/public/sport/events', data)
            .then((response) => {
                this.setState({ events: [...this.state.events, ...response.data.sportEvents] });
                this.setState({ count: response.data.count });
                this.setState({ page: page + 1 });
                this.setState({ letFetch: true });
                this.hasMore();
            })
            .catch((error) => {
                this.setState({
                    errors: error,
                });
            });
    };

    getEvents = async () => {
        const { letFetch } = this.state;
        if (letFetch) {
            this.fetchEvents();
        }
    };

    hasMore = () => {
        const { count, events } = this.state;
        if (count > events.length || count == null) {
            this.setState({ hasMore: true })
        }
        this.setState({ hasMore: false })
    };

    setFilters = (sportId, from, to, min, max) => {
        this.state.sportId = sportId;
        this.state.from = from;
        this.state.to = to;
        this.state.min = min;
        this.state.max = max;
        this.state.page = 0;
        this.setState({ events:[] });
        this.setState({ letFetch: true });
        this.setState({ hasMore: true });
    };


    render() {
        const { events, hasMore } = this.state;
        const { user } = this.props;
        return (
            <div className="py-4">
                <div className="container">
                    <FilterBar setFilters={this.setFilters}/>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.getEvents}
                        hasMore={hasMore}
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