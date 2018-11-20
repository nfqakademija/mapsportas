import React, { Component } from 'react';
import axios from 'axios';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            opened: false,
            participiants: this.props.event.applyed_users.length
        };
    }


    toggleInfo = () => {
        const { opened } = this.state;

        this.setState({
            opened: !opened
        });
    };

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
            opened,
            participiants,
        } = this.state;
        return (
            <div className="col-12 col-md-6">
                <div className="card my-4">
                    <div className="card-body bg-dark text-warning">
                        <div className="card-title row py-2 text-info" onClick={this.toggleInfo}>
                            <div className="col-3">
                              <img className="card-img-top" src={"/images/sport_types/" + sport_type.name + ".png"} alt="Image" />
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <span className="font-weight-bold mb-2 text-center px-4">{date}</span>
                                </div>
                                <div className="row justify-content-between mb-2 px-4">
                                  <span>Vieta:</span><span>{sport_venue.name}</span>
                                </div>
                            </div>
                        </div>
                        {opened
                            ?
                            <div className="px-4">
                                <div className="row justify-content-between mb-2">
                                    <span>Organizatorius:</span><span>{creator.username}</span>
                                </div>
                                <div className="row justify-content-between mb-2">
                                    <span>Adresas: </span>
                                    <span>{sport_venue.address}</span>
                                </div>
                                <div className="row justify-content-between mb-2">
                                    <span>Dalyviai: </span>
                                    <span>{participiants}/{max_members}</span>
                                </div>
                                <div className="row text-center mb-2">
                                    <button className="btn btn-success px-5" onClick={this.handleApplication.bind(this, id)}>
                                        Dalyvauti
                                    </button>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Event;