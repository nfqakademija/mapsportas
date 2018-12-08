import React from 'react';
import Loader from "react-loader-spinner";

const Spinner = ({ isLoading }) => {
    return (
        <React.Fragment>
            {isLoading
                ?
                    <div className="text-center my-3">
                        <Loader type="Oval" color="green" height="50" width="50"/>
                    </div>
                : null
            }
        </React.Fragment>
    );
};

export default Spinner;