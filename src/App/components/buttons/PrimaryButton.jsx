import React from 'react';
import { Link } from "react-router-dom";

// Pass handleClick function if its button and redirect if its link
const PrimaryButton = ({ text, handleClick = null, redirect = null }) => {
    return (
        <React.Fragment>
            { redirect
                ? <Link className="btn my-btn" to={redirect}>{text}</Link>
                : null
            }
            { handleClick
                ? <button className="btn my-btn" onClick={handleClick}>{text}</button>
                : null
            }
        </React.Fragment>
    );
};

export default PrimaryButton;