import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            participiants: this.props.event.applyed_users.length,
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
                if (response.status === 201) {
                    this.setState({
                        participiants: this.state.participiants + 1,
                        message: response.data,
                    });
                }
            })
            .catch((error) => {
                this.setState({ message: error.response.data });
            });
    };

    render() {
        const {
            user,
            event: {
                sport_type,
                sport_venue,
                creator,
                date,
                id,
                max_members,
            },
        } = this.props;
        const {
            participiants,
            message,
        } = this.state;
        return (


            <div className="col-12 col-md-6 col-lg-4">
                <div className="single-event-table mb-5" style={{
                    border: 'rgb(56, 177, 67) solid 3px'
                }}>
                    <img className="img-fluid" src={"/images/venues/" + sport_venue.venue_photo} alt=""></img>
                    <div className="event-table-content mt-3">
                        <h2 className="event">
                            {sport_venue.name}
                        </h2>
                        <h5>{sport_type.name}</h5>
                        <ul className="event-data">
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Organizatorius: {creator.username}
                            </li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i>
                                Dalyviai: {participiants}/{max_members}</li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Laikas: {date}</li>
                            <li><i className="fa fa-circle" aria-hidden="true"></i> Adresas: {sport_venue.address}</li>
                        </ul>
                        <div className="ml-3 my-3">
                            {
                                Object.keys(user).length !== 0
                                    ? (
                                    <button className="btn my-btn"
                                            onClick={this.handleApplication.bind(this, id)}>
                                        Dalyvauti
                                    </button>
                                )
                                    : <Link className="btn my-btn" to="/auth">
                                    Prisijunk
                                </Link>
                            }
                        </div>
                        <div className="ml-3 my-3">
                            {
                                message.hasOwnProperty('success_message')
                                    ? <span style={{ color: 'green' }}>{message.success_message}</span>
                                    : <span style={{ color: 'red' }}>{message.error_message}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Event;