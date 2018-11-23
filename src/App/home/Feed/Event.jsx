import React, { Component } from 'react';
import axios from 'axios';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            participiants: this.props.event.applyed_users.length
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
                if (response.status === 201 ) {
                    this.setState({
                       participiants: this.state.participiants + 1,
                    });
                }

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
                max_members
            }
        } = this.props;
        const {
            participiants,
        } = this.state;
        return (


            <div className="col-12 col-md-6 col-lg-4">
                <div className="single-event-table mb-100">
                    <img src="img/bg-img/bg-8.jpg" alt=""></img>
                        <div className="event-table-content">
                            <h2 className="event">
                                {sport_venue.name}
                            </h2>
                            <h5>{sport_type.name}</h5>
                            <ul className="event-data">
                                <li><i className="fa fa-circle" aria-hidden="true"></i> Organizatorius: {creator.username}</li>
                                <li><i className="fa fa-circle" aria-hidden="true"></i> Dalyviai: {participiants}/{max_members}</li>
                                <li><i className="fa fa-circle" aria-hidden="true"></i> Laikas: {date}</li>
                                <li><i className="fa fa-circle" aria-hidden="true"></i> Adresas: {sport_venue.address}</li>
                            </ul>
                            <button className="btn fitness-btn mt-30" onClick={this.handleApplication.bind(this, id)}>Dalyvauti</button>
                        </div>
                </div>
            </div>
        );
    }
}

export default Event;