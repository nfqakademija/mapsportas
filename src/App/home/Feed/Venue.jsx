import React, { Component } from 'react';

class Venue extends Component {
    constructor() {
        super();

        this.state = {
            opened: false,
        };
    }

    toggleSeeEvents = () => {
        const { opened } = this.state;

        this.setState({
            opened: !opened,
        });
    };

    render() {
        const {
            venue: {
                name,
                address,
                description,
                venue_photo,
                sport_events
            }
        } = this.props;
        const { opened } = this.state;
        return (
            <div className="card">
                <img className="card-img-top" src={"/images/venues/" + venue_photo} alt="Image" />
                <div className="card-body bg-dark text-warning">
                    <h5 className="card-title my-4 text-info">{name}</h5>
                    <p className="card-text mb-2">Address: {address}</p>
                    <p className="card-text">Description: {description}</p>
                    <button className="btn btn-info my-2" onClick={this.toggleSeeEvents}>
                        Show Events
                    </button>

                    {opened
                        ? (sport_events.length > 0
                            ? ( sport_events.map((event, i) =>
                                    <div className="d-flex justify-content-between" key={i}><span>{event.date}</span> <span>{event.applyed_users.length}/{event.max_members}</span></div>
                                ))
                                : ( <div>No Events Here</div> )
                        )
                        : null
                    }

                </div>
            </div>
        );
    }
}


export default Venue;