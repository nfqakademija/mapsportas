import React from 'react';
import { Link } from 'react-router-dom';
import MenuUserAvatar from './MenuUserAvatar';

const Menu = (user) => (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/venues">Venues</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/event/create">Create event</Link>
                    </li>
                </ul>
                <ul className="navbar-nav form-inline my-2 my-lg-0">
                    <li className="nav-item">
                        {
                            user.user.username
                                ? <MenuUserAvatar user={user.user}/>
                                : <Link className="nav-link" to='/auth'>Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    </React.Fragment>
);

export default Menu;