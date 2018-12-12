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
        let button = document.getElementById('filterButton');
        let div1 = document.getElementById('showDiv1');
        let div2 = document.getElementById('showDiv2');
        button.setAttribute('aria-expanded', false)
        div1.classList.remove('show');
        div2.classList.remove('show');

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
        const { sports, sport, min, max, from, to } = this.state;
        return (
            <React.Fragment>
                <div className="row mb-5">
                    <div id="showDiv1" className="col-md-12">
                        <button id="filterButton" type="button" className="form-control dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">Filtras
                        </button>
                        <div className="dropdown dropdown-lg">
                            <div id="showDiv2" className="dropdown-menu">
                                <form className="form-horizontal" role="form">
                                    <div className="form-group">
                                        <label>Data nuo</label>
                                        <input className="form-control" type="date" name="from" onChange={this.handleFromChange} placeholder={from}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Data iki</label>
                                        <input className="form-control" type="date" name="to" onChange={this.handleToChange} placeholder={to}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Dalyviai nuo</label>
                                        <input className="form-control" type="number" name="min" onChange={this.handleMinChange} placeholder={min}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Dalyviai iki</label>
                                        <input className="form-control" type="number" name="max" onChange={this.handleMaxChange} placeholder={max}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Sporto Rūšis </label>
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
                                    </div>
                                    <button className="btn btn-success mb-4"
                                            type="button"
                                            aria-hidden="true"
                                            onClick={this.sendData}>Filtruoti
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default FilterBar;