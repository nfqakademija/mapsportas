import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/home">Home</Link>
            <button className="navbar-toggler" type="button">
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/venues">Venues</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/event/create">Create event</Link>
                    </li>
                </ul>
                <ul className="form-inline my-2 my-lg-0">
                    <p className="my-2 my-sm-0">user name</p>
                    <li className="my-2 my-sm-0">Avatar place</li>
                </ul>
            </div>
        </nav>
    </React.Fragment>
);

export default Menu;