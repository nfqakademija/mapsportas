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
        handleCloseAuthModal,
        handleOpenAuthModal,
        showAuthModal,
        getUser,
        handleCloseCreateEventModal,
        handleOpenCreateEventModal,
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
                                <li className="nav-item"><span className="nav-link" onClick={handleOpenCreateEventModal}>Sukurti</span></li>
                                <MainModal
                                    isOpen={showCreateEventModal}
                                    handleCloseModal={handleCloseCreateEventModal}
                                    content={
                                        <EventCreateForm handleCloseModal={handleCloseCreateEventModal}/>
                                    }
                                />
                                {user.username
                                    ? <MenuUserAvatar user={user} onClick={logout}/>
                                    : (
                                        <React.Fragment>
                                            <li className="nav-item"><span className="nav-link" onClick={handleOpenAuthModal}>Prisijungti</span></li>
                                            <MainModal
                                                isOpen={showAuthModal}
                                                handleCloseModal={handleCloseAuthModal}
                                                content={
                                                    <AuthenticationHandler
                                                        getUser={getUser}
                                                        handleCloseModal={handleCloseAuthModal}
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