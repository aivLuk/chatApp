import React, { useEffect } from 'react';
import './ChatWindow.scss';

const ChatWindow = ({ chat }) => {
    let messages;
    if (!chat) {
        messages = <div className="loadingMsg">Loading...</div>
    } else {
        messages = chat.messages.map((msg, i) => {
            const msgClass = msg.user === 'You' ? 'myMessage' : 'yourMessage';
            return (
                <div
                    key={i}
                    className={msgClass}>
                    <span className="msgUser">{msg.user}, </span>
                    <span className="msgTime">{new Date(msg.timestamp).toLocaleString()}</span>
                    <div>{msg.message}</div>
                </div>
            )
        }).reverse();
    }

    useEffect(() => {

    }, [chat])

    return (
        <div className="chatWindow">
            {messages}
        </div>
    )
}

export default ChatWindow;