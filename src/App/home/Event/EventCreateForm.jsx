import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { fetchVenues, fetchSports } from '../../../../assets/js/fetchPublic';

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
        venues: [],
        sports: [],
    };

    componentDidMount() {
        fetchVenues()
            .then((response) => this.setState({ venues: [response.data] }))
            .catch((errors) => console.log(errors));
        fetchSports()
            .then((response) => this.setState({ sports: [response.data] }))
            .catch((errors) => console.log(errors));
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            { event: { ...this.state.event, [name]: value } },
        );
    };

    handleSubmit = (event) => {
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
                        message: 'Event created',
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    errors: error,
                });
            });
    };

    render() {
        const { sports, venues } = this.state;
        return (
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        Create event
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Max members</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="1"
                                    max="100"
                                    name="maxMembers"
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label >Sport</label>
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
                            <div className="form-group">
                                <label>Venue</label>
                                <select className="form-control" name="sportVenue"
                                        onChange={() => this.handleChange(event)}>
                                    <option value=""></option>
                                    {
                                        venues.map((venue) => (
                                            <option key={venue.id} value={venue.id}>{venue.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <FormControl margin="normal" fullWidth={true}>
                                    <TextField
                                        name="date"
                                        type="datetime-local"
                                        label="Date"
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
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
            </div>
        );
    }
}
export default EventCreateForm;