import React from 'react';
import { Link } from 'react-router-dom';

const MenuUserAvatar = (user) => {
    return (
        <React.Fragment>
            <Link className="nav-link" to="/profile">{user.user.username}</Link>
        </React.Fragment>
    );
};

export default MenuUserAvatar;