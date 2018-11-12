import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        const { text } = this.props;
        return (
            <div className="form-group has-danger">
                <div className="form-control-feedback form-control-danger">{text}</div>
            </div>
        );
    }
}
export default ErrorMessage;