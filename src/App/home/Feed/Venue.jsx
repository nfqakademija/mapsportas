import React, { Component } from 'react';
import VenueModal from '../../Modals/VenueModal';
import SecondaryButton from "../../components/buttons/SecondaryButton";


class Venue extends Component {
    constructor(props) {
        super(props);

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
            user,
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
                    <div className="card-body bg-dark text-white">
                        <h5 className="card-title my-4 text-info">{name}</h5>
                        <p className="card-text mb-2">Adresas: {address}</p>
                        <p className="card-text">Aprašymas: {description}</p>
                        {opened
                            ? <SecondaryButton handleClick={this.toggleEvents} text={"Paslėpti"}/>
                            : <SecondaryButton handleClick={this.toggleEvents} text={"Rodyti Susitikimus"}/>
                        }
                        {opened && sport_events.length > 0
                            ? <div className="d-flex justify-content-between mb-2 "><span>Data</span><span>Dalyviai</span></div>
                            : null
                        }
                        {opened
                            ? (sport_events.length > 0
                                    ? ( sport_events.map((event, i) =>
                                        <VenueModal key={i}
                                                    event={event}
                                                    name={name}
                                                    address={address}
                                                    description={description}
                                                    photo={venue_photo}
                                                    user={user}
                                        />
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
