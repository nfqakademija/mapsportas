import React from 'react';
import { Link } from 'react-router-dom';

const MenuUserAvatar = ({user, onClick}) => {
    return (
        <React.Fragment>
            <li><Link className="nav-link" to="/profile">{user.username}</Link></li>
            <li><Link
                to="/"
                className="nav-link"
                onClick={onClick}
            >
                Logout
            </Link></li>
        </React.Fragment>
    );
};

export default MenuUserAvatar;