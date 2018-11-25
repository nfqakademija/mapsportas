import React, { Component } from 'react';
import UploadImage from '../../../../assets/js/UploadImage';
import AppliedEvent from './AppliedEvent';
import axios from 'axios';

class Profile extends Component {
    state = {
        isImageUploadVisible: false,
        file: null,
        message: '',
    };

    handleChange = (event) => {
        this.setState({ file: event.target.files[0] });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { file } = this.state;
        const formData = new FormData();
        formData.append('avatar', file);
        axios
            .post('/api/user/avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ message: response.data });
                }
            })
            .catch((error) => {
                this.setState({message: error.response.data});
            })
        ;
    };

    changeImageUploadVisibility = () => {
        this.setState(state => ({ isImageUploadVisible: !this.state.isImageUploadVisible }));
    };

    render() {
        const {
            user: {
                user_applications,
                avatar,
                name,
                surname,
                email,
                sport_events,
                username,
                birth_date,
            },
        } = this.props;
        const { isImageUploadVisible, message } = this.state;
        return (
            <div className="container-fluid">
                <div className="card-deck">
                    <div className="card col-12 col-md-6 bg-dark text-info px-0">
                        <img className="card-img-top" src={"/images/avatars/" + avatar} alt="Card image cap"/>
                        <div className="card-header bg-light">
                            {username}
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-between my-2">
                                <div>Name:</div>
                                <div>{name}</div>
                            </div>
                            <div className="row justify-content-between my-2">
                                <div>Surame:</div>
                                <div>{surname}</div>
                            </div>
                            <div className="row justify-content-between my-2">
                                <div>Email:</div>
                                <div>{email}</div>
                            </div>
                            <div className="row justify-content-between my-2">
                                <div>Birth date:</div>
                                <div>{birth_date}</div>
                            </div>
                            <div className="row justify-content-between my-2">
                                <div>Events created:</div>
                                <div>{sport_events.length}</div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info" style={{ cursor: 'pointer' }}
                                        onClick={this.changeImageUploadVisibility}>
                                    Upload picture
                                </button>
                                <div className="text-center">
                                    {isImageUploadVisible
                                        ? (
                                            <form>
                                                <div>
                                                    <input
                                                        name="avatar"
                                                        type="file"
                                                        onChange={(e) => this.handleChange(e)}
                                                    />
                                                    <button
                                                        className="btn btn-sm btn-info"
                                                        onClick={(event) => this.handleSubmit(event)}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                                {message
                                                    ? <span>{message}</span>
                                                    : null
                                                }
                                            </form>
                                        )
                                        : null
                                    }
                                </div>
                            </div>
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