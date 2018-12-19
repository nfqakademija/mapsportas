import React, { Component } from 'react';
import Venue from '../home/Feed/Venue';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchVenues, fetchSports, getVenuesCount } from '../../../assets/js/fetchPublic';
import Spinner from "../components/Spinner";

class Venues extends Component {
    state = {
        venues: [],
        sports: [],
        page: 0,
        perPage: 12,
        sportId: 0,
        letFetch: true,
        count: null,
        hasMore: true
    };

    async componentDidMount() {
        this.fetchSportTypes();
    };

    fetchSportTypes = async () => {
        await fetchSports()
            .then((response) => {
                this.setState({sports: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    };

    fetchVenues = async () => {
        const { page, perPage, sportId } = this.state;
        this.state.letFetch = false;
        let first = page * perPage;
        await fetchVenues(perPage, first, sportId)
            .then((response) => {
                this.setState({ venues: [...this.state.venues, ...response.data.sportVenues] });
                this.setState({ count: response.data.count })
                this.setState({ page: page + 1 });
                this.setState({ letFetch: true });
                this.hasMore();
            })
            .catch((error) => {
                console.log(error);
            })
        ;
    };

    getVenues = async () => {
        const { letFetch } = this.state;
        if (letFetch) {
            this.fetchVenues();
        }
    };

    hasMore = () => {
        const { count, venues } = this.state;
        if (count > venues.length || count == null) {
            this.setState({ hasMore: true })
        }
        this.setState({ hasMore: false })
    };

    setFilters = (e) => {
        this.setState({ sportId: e.target.value});
        this.setState({ page: 0 });
        this.setState({ venues: [] });
        this.setState({ letFetch: true });
        this.setState({ hasMore: true });
    };

    render() {
        const { venues, sports, hasMore } = this.state;
        const { user, getUser } = this.props;
        return (
            <div className="container myTopMargin">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        <h1>Vietos</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <label className="pr-2">Sporto Rūšis
                        <select className="form-control pl-2" name="sport" onChange={this.setFilters}>
                            <option value="0">Visos</option>
                            {
                                sports.map((sport) => {
                                    return (
                                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                                    );
                                })
                            }
                        </select></label>
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getVenues}
                    hasMore={hasMore}
                    loader={
                        <Spinner key={0} isLoading={hasMore}/>
                    }
                >
                    <div className="row justify-content-center">
                        {
                            venues.map((venue) => {
                                return <Venue key={venue.id} venue={venue} user={user} getUser={getUser}/>;
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default Venues;
