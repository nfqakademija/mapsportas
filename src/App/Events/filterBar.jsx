import React, { Component } from 'react';
import { fetchSports } from "../../../assets/js/fetchPublic";

class FilterBar extends Component {

    state = {
        sports: [],
        sport: null,
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
        this.props.setFilters(this.state.sport, this.state.from, this.state.to, this.state.min, this.state.max);
    };

    handleSportChange = (e) => {
        if (e.target.value != 0) {
            this.setState({sport: e.target.value})
        } else {
            this.setState({sport: null});
        }
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
                <form className="mb-5">
                    <div className="input-group justify-content-between">
                        <label>Data nuo
                            <input className="form-control" type="date" name="from" onChange={this.handleFromChange}/>
                        </label>
                        <label>Data iki
                            <input className="form-control" type="date" name="to" onChange={this.handleToChange}/>
                        </label>
                        <label>Dalyviai nuo
                            <input className="form-control" type="number" name="min" onChange={this.handleMinChange}/>
                        </label>
                        <label>Dalyviai iki
                            <input className="form-control" type="number" name="max" onChange={this.handleMaxChange}/>
                        </label>
                        <label>Sporto Rūšis
                            <select className="form-control" name="sport" onChange={this.handleSportChange}>
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
                    <div className="text-center">
                        <button className="btn btn-success" type="button" onClick={() => this.sendData()}>Filtruoti</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
};

export default FilterBar;