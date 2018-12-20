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
        const {
            application: {
                sport_event: {
                    id,
                    date,
                    applyed_users,
                    max_members,
                    sport_type,
                    sport_venue,
                }
            }
        } = this.props;
        console.log(applyed_users);
        console.log(applyed_users.length);
        return (
            <React.Fragment>
                <div className="border-bottom py-1">
                    <div className="row p-2">
                        <div className="col-6">
                            { sport_type.name }
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-sm btn-danger"
                                onClick={this.handleCancelApplication.bind(this, id)}>
                                Nebedalyvauti
                            </button>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col-5 col-md-3">
                            {date}
                        </div>
                        <div className="col-7 col-md-6">
                            {sport_venue.name}
                        </div>
                        <div className="d-none d-md-block col-md-3">
                            {applyed_users.length + 1}/{max_members}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AppliedEvent;