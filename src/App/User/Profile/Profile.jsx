import React, { Component } from 'react';
import UploadImage from '../../../../assets/js/UploadImage';
import AppliedEvent from './AppliedEvent';

class Profile extends Component {
    state = {
        isImageUploadVisible: false,
        file: null,
    };

    handleChange = (event) => {
        this.setState({ file: event.target.files });
    };

    handleSubmit = () => {

    };

    changeImageUploadVisibility = () => {
        this.setState(state => ({ isImageUploadVisible: !this.state.isImageUploadVisible }));
    };

    render() {
        const { user, } = this.props;
        const { user_applications } = user;
        const { isImageUploadVisible } = this.state;
        return (
            <div className="container-fluid col-md-9 ml-5">
                <div className="card-deck">
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
                            <div style={{ cursor: 'pointer' }} onClick={this.changeImageUploadVisibility}>
                                Upload picture
                            </div>
                            {
                                isImageUploadVisible
                                    ? <UploadImage
                                    name="avatar"
                                    onSubmit={this.handleSubmit}
                                    onChange={this.handleChange}
                                />
                                    : null
                            }
                        </div>
                    </div>
                    {
                        user_applications
                            ? (
                            <div className="card">
                                <div className="card-header">
                                    Applied events
                                </div>
                                <div className="card-body">
                                    {
                                        user_applications.map((application, index) => {
                                            return <AppliedEvent key={index} application={application}/>;
                                        })
                                    }
                                </div>
                            </div>
                        )
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default Profile;