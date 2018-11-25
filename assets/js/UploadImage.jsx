import React, { Component } from 'react';

class UploadImage extends Component {
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