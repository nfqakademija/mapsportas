import React from "react";

const Message = ({ message }) => {
    return (
        <div className="text-center my-3">
            {
                message.hasOwnProperty('success_message')
                    ? <span style={{ color: 'green' }}>{message.success_message}</span>
                    : <span style={{ color: 'red' }}>{message.error_message}</span>
            }
        </div>
    );
};

export default Message;