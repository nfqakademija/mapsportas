import React, { Component } from 'react';
import axios from 'axios';
import { fetchSports } from '../../../../assets/js/fetchPublic';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import ErrorMessage from "../../Authentication/partials/ErrorMessage";

class EventCreateForm extends Component {
    state = {
        errors: [],
        event: {
            maxMembers: '',
            date: '',
            creator: '',
            sportType: '',
            sportVenue: '',
        },
        message: '',
        sports: [],
        venues: [],
        isLoading: false,
        startDate: new Date(),
    };

    async componentDidMount() {
        await fetchSports()
            .then((response) => this.setState({ sports: response.data }))
            .catch((errors) => console.log(errors));
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            { event: { ...this.state.event, [name]: value } },
        );
        if (name === 'sportType') {
            this.filterSportVenues(value);
        }
    };

    handleDateChange = (date) => {
        this.setState({
            startDate: date,
            event: {
                ...this.state.event, date: date,
            }
        });

    };

    filterSportVenues = (sportType) => {
        const { sports } = this.state;
        const venues = sports.filter(sport => sport.id == sportType)[0].sport_venues;
        this.setState({ venues });
    };

    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        event.preventDefault();
        const data = this.state.event;
        axios
            .post('/api/sport/event', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        message: response.data,
                        isLoading: false,
                    });
                }
                this.props.handleCloseModal();
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data,
                    isLoading: false,
                });
            });
    };

    render() {
        const { sports, venues, message, isLoading, errors } = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    Create event
                </div>
                <Spinner isLoading={isLoading}/>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'maxMembers'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Maksimalus dalyvių skaičius</label>
                            <input
                                className="form-control"
                                type="number"
                                min="1"
                                max="100"
                                name="maxMembers"
                                placeholder={this.state.event.maxMembers}
                                onChange={this.handleChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'sportType'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Sporto Rūšis</label>
                            <select className="form-control" name="sportType"
                                    onChange={() => this.handleChange(event)}>
                                <option value=""></option>
                                {
                                    sports.map((sport) => (
                                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {venues.length > 0
                        && <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'sportVenue'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <label>Vieta</label>
                            <select className="form-control" name="sportVenue"
                                    onChange={() => this.handleChange(event)}>
                                <option value=""></option>
                                {
                                    venues.map(venue => (
                                        <option key={venue.id} value={venue.id}>{venue.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        }
                        <div className="form-group">
                            {
                                errors.map((error,i) => {
                                    return error.field == 'date'
                                        ? <ErrorMessage key={i} text={error.violation_message}/>
                                        : null
                                })
                            }
                            <div>
                                <label>Data</label>
                            </div>
                            <DatePicker
                                className="form-control"
                                name="date"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy HH:mm"
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            type="Submit"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EventCreateForm;