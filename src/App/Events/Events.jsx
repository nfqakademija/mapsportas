import React, { Component } from 'react';
import Event from '../home/Feed/Event';
import FilterBar from "./filterBar";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import Spinner from "../components/Spinner";

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
                this.setState({
                    events: [...this.state.events, ...response.data.sportEvents],
                    count: response.data.count,
                    page: page + 1,
                    letFetch: true
                });
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
        const { user, getUser } = this.props;
        return (
            <div className="container myTopMargin">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        <h1>Susitikimai</h1>
                    </div>
                </div>
                <FilterBar setFilters={this.setFilters}/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getEvents}
                    hasMore={hasMore}
                    loader={
                        <Spinner key={0} isLoading={hasMore}/>
                    }
                >
                    <div className="row justify-content-center">
                        {
                            events.map((event) => {
                                return (
                                    <Event key={event.id} event={event} user={user} getUser={getUser}/>
                                );
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default Events;