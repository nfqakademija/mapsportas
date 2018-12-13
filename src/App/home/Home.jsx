import React, { Component } from 'react';
import Event from './Feed/Event';
import { fetchEventsUpcoming } from '../../../assets/js/fetchPublic';
import Slider from "./Slider/Slider";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroller";

class Home extends Component {
    state = {
        venues: [],
        events: [],
        people: [],
        isLoading: true,
        hasMore: true,
        letFetch: true,
        count: null,
        page: 0,
        perPage: 12,
    };

    async componentDidMount() {
        this.setState({ isLoading: false });
    }

    fetchAllEvents = async () => {
        const { page, perPage } = this.state;
        let first = page * perPage;
        this.state.letFetch = false;
        await fetchEventsUpcoming(12,first)
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
                console.log(error);
            })
        ;
    };

    getEvents = async () => {
        const { letFetch } = this.state;
        if (letFetch) {
            this.fetchAllEvents();
        }
    };

    hasMore = () => {
        const { count, events } = this.state;
        if (count > events.length || count == null) {
            this.setState({ hasMore: true })
        }
        this.setState({ hasMore: false })
    };

    render() {
        const { events, hasMore } = this.state;
        const { user } = this.props;
        return (
            <React.Fragment>
                <Slider/>
                <div className="py-5">
                    <div className="container">
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
                                            <Event key={event.id} event={event} user={user}/>
                                        );
                                    })
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
