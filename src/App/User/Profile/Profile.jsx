import React, { Component } from 'react';

class Profile extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="container-fluid col-md-5 ml-5">
                <div className="card">
                    <img className="card-img-top" src="..." alt="Card image cap" />
                    <div className="card-header">
                        {user.username}
                    </div>
                    <div className="card-body">
                        {user.name}
                        {user.surname}
                        {user.email}
                        {user.birth_date}
                        <div>
                            Events created: {user.sport_events.length}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;