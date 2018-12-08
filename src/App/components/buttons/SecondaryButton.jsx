import React from 'react';
import {Link} from "react-router-dom";

const SecondaryButton = ({ text, handleClick, redirect}) => {
    return (
        <React.Fragment>
            { redirect
                ? <Link className="btn btn-info my-2" to={redirect}>{text}</Link>
                : null
            }
            { handleClick
                ? <button className="btn btn-info my-2" onClick={handleClick}>{text}</button>
                : null
            }
        </React.Fragment>
    );
};

export default SecondaryButton;