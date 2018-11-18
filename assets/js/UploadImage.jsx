import React, { Component } from 'react';
import axios from 'axios';

class UploadImage extends Component {
    state = {
        file: null,
    };

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            file: event.target.files,
        });
    };

    fileUploadHandler = () => {
        //todo: waiting on Endpoint.
        console.log(this.state);
    };

    render() {
        const { onChange, name } = this.props;
        return (
            <React.Fragment>
                <div>
                    <input
                        name={name}
                        type="file"
                        onChange={onChange}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default UploadImage;