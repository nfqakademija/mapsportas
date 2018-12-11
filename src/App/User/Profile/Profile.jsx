import React, { Component } from 'react';
import AppliedEvent from './AppliedEvent';
import axios from 'axios';

class Profile extends Component {
    state = {
        isImageUploadVisible: false,
        file: null,
        message: '',
        applicationsLoaded: false,
        user: {},
    };

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = async () => {
        await axios
            .get('api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                    },
                },
            )
            .then(response => {
                this.setState({
                    user: response.data.user,
                    applicationsLoaded: true,
                });
            })
            .catch(error => console.log(error));
    };

    onEventLeave = (id) => {
        const { user: { user_applications } } = this.state;
        const apps = user_applications.filter(application => application.sport_event.id !== id);
        this.setState({
            user: { user_applications: apps },
        });
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
                this.setState({ message: error.response.data });
            })
        ;
    };

    changeImageUploadVisibility = () => {
        this.setState(state => ({ isImageUploadVisible: !this.state.isImageUploadVisible }));
    };

    render() {
        const {
            isImageUploadVisible,
            message,
            applicationsLoaded,
            user: {
                avatar,
                name,
                surname,
                email,
                sport_events,
                username,
                birth_date,
                user_applications,
            },
        } = this.state;
        return (
            <React.Fragment>
                <div className="myTopMargin container">
                    <div className="row">
                        <div className="col-12 card bg-dark text-info my-3">
                            <div className="row card-header bg-light">
                                <div className="col-12">
                                    {username}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 offset-3 offset-md-0 col-md-4 text-center  my-3">
                                    <img className="img-fluid avatar" src={'/images/avatars/' + avatar} alt="Card image cap"/>
                                </div>
                                <div className="col-6 offset-3 col-md-6 offset-md-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row py-2">
                                                <div className="col-12">
                                                    Vardas: {name}
                                                </div>
                                            </div>
                                            <div className="row py-2">
                                                <div className="col-12">
                                                    Pavardė: {surname}
                                                </div>
                                            </div>
                                            <div className="row py-2">
                                                <div className="col-12">
                                                    El. Paštas: {email}
                                                </div>
                                            </div>
                                            <div className="row py-2">
                                                <div className="col-12">
                                                    Gimimo data: {birth_date}
                                                </div>
                                            </div>
                                            <div className="row py-2">
                                                <div className="col-12">
                                                    Sukurta susitikimų: {sport_events && sport_events.length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <form className="form-group">
                                            <div className="row justify-content-between">
                                                <div className="col-12 col-md-6 my-3">
                                                    <input
                                                        name="avatar"
                                                        type="file"
                                                        onChange={(e) => this.handleChange(e)}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-4 offset-md-2 my-3">
                                                    <button
                                                        className="btn btn-sm btn-info px-4"
                                                        onClick={(event) => this.handleSubmit(event)}
                                                    >
                                                        Įkelti
                                                    </button>
                                                </div>
                                            </div>
                                            {message
                                                ? <span>{message}</span>
                                                : null
                                            }
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5">
                        {applicationsLoaded
                        &&
                        <div className="card col-12">
                            <div className="card-header row">
                                Tavo susitikimai
                            </div>
                            <div className="card-body col-12">
                                {user_applications.length > 0
                                    ? user_applications.map((application, index) => {
                                        return <AppliedEvent key={index} application={application}
                                                             onLeave={this.onEventLeave}/>;
                                    })
                                    : <p>Dar niekur neaplikavai.</p>
                                }
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;