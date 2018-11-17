import React, { Component } from 'react';
import axios from 'axios';

class UploadImage extends Component {
    state = {
        file: null
    };

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            file: event.target.files
        })
    };

    fileUploadHandler = () => {
        //todo: waiting on Endpoint.
        console.log(this.state);
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <input
                        style={{display: 'none'}}
                        type="file"
                        onChange={this.fileSelectHandler}
                        ref={fileInput => this.fileInput = fileInput}
                    />
                    <button onClick={() => this.fileInput.click()}>Pick a file</button>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
            </React.Fragment>
        );
    }
}

export default UploadImage;