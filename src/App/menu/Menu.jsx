import React from 'react';
import { Link } from 'react-router-dom';
import MenuUserAvatar from './MenuUserAvatar';
import MainModal from "../components/MainModal";
import AuthenticationHandler from "../Authentication/AuthenticationHandler";
import EventCreateForm from "../home/Event/EventCreateForm";

const Menu = (
    {
        user,
        isLoading = true,
        logout,
        handleAuthModal,
        showAuthModal,
        getUser,
        handleCreateEventModal,
        showCreateEventModal
    }) => {
    return (
        <header>
            <nav id="navbar" className="navbar navbar-dark my-navbar navbar-expand-md">
                <Link className="navbar-brand" to="/">
                    <img src="img/core-img/logo.png" alt=""></img>
                </Link>
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    {
                        !isLoading && (
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li className="nav-item"><Link className="nav-link" to="/events">Susitikimai</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/venues">Vietos</Link></li>
                                <MainModal
                                    isOpen={showCreateEventModal}
                                    handleCloseModal={handleCreateEventModal}
                                    content={
                                        <EventCreateForm handleCloseModal={handleCreateEventModal}/>
                                    }
                                />
                                {user.username
                                    ? (
                                        <li className="dropdown nav-item">
                                            <span className="myPointer dropdown-toggle nav-link"
                                                  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                  aria-expanded="false">
                                                {user.username}
                                            </span>
                                            <div className="dropdown-menu myDropdown" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item myPointer my-1" onClick={handleCreateEventModal}>Sukurti Susitikimą</a>
                                                <MainModal
                                                    isOpen={showCreateEventModal}
                                                    handleCloseModal={handleCreateEventModal}
                                                    content={
                                                        <EventCreateForm handleCloseModal={handleCreateEventModal}/>
                                                    }
                                                />
                                                <Link className="dropdown-item my-1" to={"/profile"} >Profilis</Link>
                                                <a className="dropdown-item myPointer my-1" onClick={logout}>Atsijungti</a>
                                            </div>
                                        </li>
                                    )
                                    : (
                                        <React.Fragment>
                                            <li className="nav-item"><span className="nav-link myPointer" onClick={handleAuthModal}>Prisijungti</span></li>
                                            <MainModal
                                                isOpen={showAuthModal}
                                                handleCloseModal={handleAuthModal}
                                                content={
                                                    <AuthenticationHandler
                                                        getUser={getUser}
                                                        handleCloseModal={handleAuthModal}
                                                    />
                                                }
                                            />
                                        </React.Fragment>
                                    )
                                }
                            </ul>
                        )
                    }

                </div>
            </nav>
        </header>
    );
};

export default Menu;