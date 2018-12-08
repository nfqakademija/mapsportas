import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        const { text } = this.props;
        return (
            <div className="alert alert-danger text-center">
                <p>{text}</p>
            </div>
        );
    }
}
export default ErrorMessage;