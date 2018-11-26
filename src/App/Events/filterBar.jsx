import React, { Component } from 'react';
import { fetchSports } from "../../../assets/js/fetchPublic";

import { Link } from 'react-router-dom';

class FilterBar extends Component {

    state = {
        sports: [],
        sport: 1,
        from: null,
        to: null,
        min: null,
        max: null,
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

    sendData = () => {
        console.log('labas');
        this.props.setFilters(this.state.sport, this.state.from, this.state.to, this.state.min, this.state.max);
    };

    handleSportChange = (e) => {
        this.setState({sport: e.target.value})
    };

    handleFromChange = (e) => {
        this.setState({from: e.target.value})
    };

    handleToChange = (e) => {
        this.setState({to: e.target.value})
    };

    handleMinChange = (e) => {
        this.setState({min: e.target.value})
    };

    handleMaxChange = (e) => {
        this.setState({max: e.target.value})
    };

    render() {
        const { sports } = this.state;
        return (
            <React.Fragment>
                <form>
                    <select name="sport" onChange={this.handleSportChange}>
                        {
                            sports.map((sport) => {
                                return (
                                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                                );
                            })
                        }
                    </select>
                    <input type="date" name="from" onChange={this.handleFromChange}/>
                    <input type="date" name="to" onChange={this.handleToChange}/>
                    <input type="number" name="min" onChange={this.handleMinChange}/>
                    <input type="number" name="max" onChange={this.handleMaxChange}/>
                    <button type="button" onClick={() => this.sendData()}>Filtruoti</button>
                </form>
            </React.Fragment>
        );
    }
};

export default FilterBar;