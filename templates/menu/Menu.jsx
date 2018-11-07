import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

const Menu = () => (
    <React.Fragment>
        <MenuList dense={true}>
            <MenuItem component={Link} to="/home">
                Home
            </MenuItem>
        </MenuList>
    </React.Fragment>
);

export default Menu;