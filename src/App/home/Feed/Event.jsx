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
        const { event } = this.props;
        const { sport_type, sport_venue, creator } = event;
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <span className="font-weight-bold">{event.date}</span>
                            <a data-toggle="collapse" href={`#collapse-${event.id}`}>{sport_type.name}</a>
                            {' '}
                            <span>{sport_venue.name}</span>
                            {' '}
                            <span> by {creator.username}</span>
                        </div>
                        <div id={`collapse-${event.id}`} className="card-collapse collapse">
                            <div>
                                {event.date}
                            </div>
                            <button className="btn btn-default" onClick={this.handleApplication.bind(this, event.id)}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Event;