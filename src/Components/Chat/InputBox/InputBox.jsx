import React, { useState } from 'react';
import { fetchUpdateData } from '../../../utils';
import './InputBox.scss';

const InputBox = ({ allChats, editChats, currChat, selectChat, setErr }) => {
    const [inputValue, setInputValue] = useState('');

    const msgChangedHandler = (ev) => {
        setInputValue(ev.target.value);
    }

    const sendMessageHandler = async () => {
        const currentChat = { ...currChat };
        const chatMessages = [...currentChat.messages];
        const newMessage = {
            user: 'You',
            timestamp: Date.now(),
            message: inputValue
        }
        chatMessages.push(newMessage);
        currentChat.messages = chatMessages;
        const arrOfAllChats = [...allChats];
        const indxOfCurrChat = arrOfAllChats.findIndex(el => el.userId === currentChat.userId);
        arrOfAllChats[indxOfCurrChat] = currentChat;
        const updateData = { chats: arrOfAllChats };
        try {
            const response = await fetchUpdateData(updateData);
            editChats(response.data.data.chats);
            selectChat(response.data.data.chats[indxOfCurrChat]);
            setInputValue('');
        }
        catch (err) {
            setErr('Message wasn\'t sent, please try again...');
        }
    }

    const handleUpdateOnEnterPress = (e) => {
        e.key === 'Enter' && sendMessageHandler()
    }

    return (
        <div className="inputBox">
            <div className="inputBoxContainer">
                <input
                    className='inputBoxField'
                    value={inputValue}
                    onChange={msgChangedHandler}
                    onKeyPress={handleUpdateOnEnterPress}
                    placeholder="Type a message" />
                <span
                    className="material-icons send"
                    onClick={sendMessageHandler}>
                    send
                </span>
            </div>
        </div >
    )
}

export default InputBox;