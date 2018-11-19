import React, { Component } from 'react';
import axios from 'axios';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleApplication = (id) => {
        axios
            .post('/api/sport/event/apply', {
                    sportEvent: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                })
            .then((response) => {
                console.log(response);
                this.setState({
                    message: response.data,
                });
            });
    };

    render() {
        const {
            event: {
                sport_type,
                sport_venue,
                creator,
                date,
                id,
                max_members,
                applyed_users
            }
        } = this.props;
        return (
            <React.Fragment>
                <div className="card my-4">
                    <div className="card-body bg-dark text-warning">
                        <a className="text-warning" data-toggle="collapse" href={`#collapse-${id}`}>
                            <div className="card-title d-flex justify-content-around py-2 text-info">
                                <span className="font-weight-bold">{date}</span>
                                <span>{sport_type.name}</span>
                                <span>{sport_venue.name}</span>
                                <span> by {creator.username}</span>
                            </div>
                        </a>
                        <div id={`collapse-${id}`} className="card-collapse collapse">
                            <div className="row">
                                <div className="col-12 col-md-6 d-flex justify-content-around my-2">
                                    <span>Address: </span>
                                    <span>{sport_venue.address}</span>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-around my-2">
                                    <span>People IN: </span>
                                    <span>{applyed_users.length}/{max_members}</span>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn btn-success" onClick={this.handleApplication.bind(this, id)}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Event;