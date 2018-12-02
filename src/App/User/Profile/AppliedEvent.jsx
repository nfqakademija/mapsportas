import React, { Component } from 'react';
import axios from 'axios';

class AppliedEvent extends Component {
    state = {
        message: '',
    };
    handleCancelApplication = (id) => {
        axios
            .delete(`/api/sport/event/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                },
            })
            .then((response) => {
                this.setState({
                    message: response.data,
                });
                this.props.onLeave(id);
            });
    };

    render() {
        const { application } = this.props;
        return (
            <React.Fragment>
                <div>applied: {application.created_at}
                    sport: {application.sport_event.sport_type.name}
                </div>
                <button className="btn btn-sm btn-danger"
                        onClick={this.handleCancelApplication.bind(this, application.sport_event.id)}>
                    Cancel application
                </button>
            </React.Fragment>
        );
    }
}

export default AppliedEvent;