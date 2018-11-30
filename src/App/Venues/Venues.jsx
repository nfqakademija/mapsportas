import React, { Component } from 'react';
import Venue from '../home/Feed/Venue';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchVenues, fetchSports } from '../../../assets/js/fetchPublic';

class Venues extends Component {
    state = {
        venues: [],
        sports: [],
        page: 0,
        perPage: 12,
        sportId: 0,
        letFetch: true,
    };

    async componentDidMount() {
        this.fetchSportTypes();
    }

    fetchSportTypes = async () => {
        await fetchSports()
            .then((response) => {
                this.setState({sports: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    };

    getVenues = async () => {
        const { page, perPage, sportId, letFetch } = this.state;
        if (letFetch) {
            this.state.letFetch = false;
            let first = page * perPage;
            await fetchVenues(perPage, first, sportId)
                .then((response) => {
                    this.setState({ venues: [...this.state.venues, ...response.data] });
                    this.setState({page: page + 1});
                    this.state.letFetch = true;
                })
                .catch((error) => {
                    console.log(error);
                })
            ;
        }
    };

    setFilters = (e) => {
        this.setState({sportId: e.target.value});
        this.state.page = 0;
        this.setState({venues:[]});
    };

    render() {
        const { venues, sports } = this.state;
        return (
            <div className="fitness-pricing-table-area section-padding-100-0">
                <div className="container">
                    <div>
                        <label>Sporto Rūšis
                            <select className="form-control" name="sport" onChange={this.setFilters}>
                                <option value="0">Visos</option>
                                {
                                    sports.map((sport) => {
                                        return (
                                            <option key={sport.id} value={sport.id}>{sport.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </label>
                    </div>
                     <InfiniteScroll
                        pageStart={0}
                        loadMore={this.getVenues}
                        hasMore={true}
                        loader={
                            <div className="text-center" key={0}>
                                <div className="btn btn-info mb-5">Loading ...</div>
                            </div>}
                    >
                        <div className="row justify-content-center">
                            {
                                venues.map((venue) => {
                                    return <Venue key={venue.id} venue={venue}/>;
                                })
                            }
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default Venues;