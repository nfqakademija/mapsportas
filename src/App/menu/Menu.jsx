import React from 'react';
import { Link } from 'react-router-dom';
import MenuUserAvatar from './MenuUserAvatar';

const Menu = (user) => (
    <React.Fragment>
        <div id="preloader">
            <i className="circle-preloader"></i>
        </div>
        <header className="header-area">
            <div className="fitness-main-menu">
                <div className="classy-nav-container breakpoint-off">
                    <div className="container">
                        <nav className="classy-navbar justify-content-between" id="fitnessNav">
                            <Link className="navbar-brand" to="/"><img src="img/core-img/logo.png" alt=""></img></Link>

                            <div className="classy-navbar-toggler">
                                <span className="navbarToggler"><span></span><span></span><span></span></span>
                            </div>

                            <div className="classy-menu">

                                <div className="classycloseIcon">
                                    <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                </div>

                                <div className="classynav">
                                    <ul>
                                        <li><Link to="/venues">Vietos</Link></li>
                                        <li><Link to="/event/create">Sukurti</Link></li>
                                        <li className="nav-item">
                                            {
                                                user.user.username
                                                    ? <MenuUserAvatar user={user.user}/>
                                                    : <Link className="nav-link" to='/auth'>Login</Link>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    </React.Fragment>
);

export default Menu;