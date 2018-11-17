import React, { Component } from 'react';
import axios from 'axios';

class AddNewVenueForm extends Component {
    state = {
        venue: {
            sportType: null,
            name: '',
            description: '',
            address: '',
            city: '',
        },
        message: '',
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            venue: { ...this.state.venue, [name]: value },
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { venue } = this.state;
        axios
            .post('/api/admin/sport/venue', venue,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                },
            )
            .then((response) => {
                this.setState({
                    message: response.data,
                });
            })
        ;
    };

    render() {
        const { message } = this.state;
        return (
            <React.Fragment>
                <div className="">
                    {
                        message
                            ? (
                            <p>message</p>
                        )
                            : null
                    }
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-group">
                            <label>Sport type</label>
                            <input
                                className="form-control"
                                name="sportType"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                className="form-control"
                                name="description"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                className="form-control"
                                name="address"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                className="form-control"
                                name="city"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            type="Submit">
                            Submit
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default AddNewVenueForm;