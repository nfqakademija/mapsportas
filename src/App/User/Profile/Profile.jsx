import React, { Component } from 'react';
import UploadImage from '../../../../assets/js/UploadImage';

class Profile extends Component {
    state = {
        isImageUploadVisible: false,
    };

    changeImageUploadVisibility = () => {
        this.setState(state => ({ isImageUploadVisible: !this.state.isImageUploadVisible }));
    };

    render() {
        const { user } = this.props;
        const { isImageUploadVisible } = this.state;
        return (
            <div className="container-fluid col-md-5 ml-5">
                <div className="card">
                    <img className="card-img-top" src="..." alt="Card image cap"/>
                    <div className="card-header">
                        {user.username}
                    </div>
                    <div className="card-body">
                        {user.name}
                        {user.surname}
                        {user.email}
                        {user.birth_date}
                        Events created: {user.sport_events.length}
                        <div style={{cursor: 'pointer'}} onClick={this.changeImageUploadVisibility}>
                            Upload picture
                        </div>
                        {
                            isImageUploadVisible
                                ? <UploadImage/>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;