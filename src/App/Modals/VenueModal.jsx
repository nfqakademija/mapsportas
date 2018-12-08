import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

class VenueModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            participiants: this.props.event.applyed_users.length,
            isLoading: false,
            message: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    handleApplication = (id) => {
        this.setState({ isLoading: true });
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
                if (response.status === 201) {
                    this.setState({
                        participiants: this.state.participiants + 1,
                        message: response.data,
                        isLoading: false
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    message: error.response.data,
                    isLoading: false
                });
            });
    };

    render () {
        const { event, name, description, photo, address, user } = this.props;
        const { participiants, message, isLoading } = this.state;
        return (
            <div className="myPointer">
                <div className="d-flex justify-content-between border-bottom mb-2" onClick={this.handleOpenModal}>
                    <span>{event.date}</span>
                    <span>{participiants}/{event.max_members}</span>
                </div>

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal Example"
                    style={{
                        overlay: {
                            zIndex: '1000'
                        },

                        content: {

                        }
                    }}
                >
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <img className="img-fluid" src={"/images/venues/" + photo}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <h4>{name}</h4>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <span>Data ir Laikas:</span> <span>{event.date}</span>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <span>Adresas:</span> <span>{address}</span>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <span>Dalyviai:</span> <span>{participiants}/{event.max_members}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            Aikštelės aprašymas:
                        </div>
                        <div className="col-12">
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        {
                            Object.keys(user).length !== 0
                                ? <PrimaryButton handleClick={this.handleApplication.bind(this, event.id)} text={"Dalyvauti"}/>
                                : <Link className="btn my-btn" to="/auth">Prisijunk</Link>
                        }
                    </div>
                    <Spinner isLoading={isLoading}/>
                    <Message message={message}/>
                    <div className="text-center mt-5">
                        <button className="btn btn-danger" onClick={this.handleCloseModal}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default VenueModal;
