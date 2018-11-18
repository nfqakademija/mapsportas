import React, { Component } from 'react';

class Venue extends Component {
    render() {
        const { venue } = this.props;
        console.log(venue);
        return (
            <div className="card">
                <img className="card-img-top" src={"/images/venues/" + venue.venue_photo} alt="Image" />
                <div className="card-body">
                    <h5 className="card-title">{venue.name}</h5>
                </div>
            </div>
        );
    }
}

export default Venue;