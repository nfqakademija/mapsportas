import React, { Component } from 'react';

class Venue extends Component {
    constructor() {
        super();

        this.state = {
            opened: false,
        };
    }

    toggleEvents = () => {
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
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card my-2">
                    <img className="card-img-top" src={"/images/venues/" + venue_photo} alt="Image" />
                    <div className="card-body bg-dark text-warning">
                        <h5 className="card-title my-4 text-info">{name}</h5>
                        <p className="card-text mb-2">Adresas: {address}</p>
                        <p className="card-text">Aprašymas: {description}</p>
                        <button className="btn btn-info my-2" onClick={this.toggleEvents}>
                            Rodyti Renginius
                        </button>
                        {opened && sport_events.length > 0
                            ? <div className="d-flex justify-content-between mb-2 "><span>Data</span><span>Dalyviai</span></div>
                            : null
                        }
                        {opened
                            ? (sport_events.length > 0
                                    ? ( sport_events.map((event, i) =>
                                        <div className="d-flex justify-content-between border-bottom mb-2" key={i}><span>{event.date}</span> <span>{event.applyed_users.length}/{event.max_members}</span></div>
                                    ))
                                    : ( <div>Nėra renginių</div> )
                            )
                            : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}


export default Venue;