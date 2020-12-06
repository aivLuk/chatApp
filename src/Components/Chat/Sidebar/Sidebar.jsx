import React, { useContext, useState } from 'react';
import { ChatContext } from '../../../contexts';
import { fetchUpdateData } from '../../../utils';
import './Sidebar.scss';

const Sidebar = ({ isOpened, chats, editChats, setCurrentChat, setErr }) => {
    const { activeChat, setActiveChat } = useContext(ChatContext);
    const [addingNewChat, setAddingNewChat] = useState(false);
    const [newChatName, setNewChatName] = useState('');
    const [userExists, setUserExists] = useState(false);

    const chatClickedHandler = (currChat, indx) => {
        setActiveChat(indx);
        setCurrentChat(currChat);
    }

    const newChatHandler = () => {
        setAddingNewChat(true);
    }

    const newChatNameChangedHandler = (ev) => {
        setUserExists(false);
        setNewChatName(ev.target.value);
    }

    const cancelAddingNewChat = () => {
        setAddingNewChat(false);
        setNewChatName('');
        setUserExists(false);
    }

    const submitNewChatHandler = async () => {
        if (newChatName) {
            const alreadyExistsArr = chats.filter(el => el.userId === newChatName);
            if (alreadyExistsArr.length) {
                setUserExists(true);
                return;
            }
            const newChat = {
                userId: newChatName,
                messages: []
            }
            const currentChats = [...chats];
            currentChats.push(newChat);
            const updateData = { chats: currentChats };
            try {
                const response = await fetchUpdateData(updateData);
                editChats(response.data.data.chats);
                setCurrentChat(response.data.data.chats.slice(-1)[0]);
                setAddingNewChat(false);
                setNewChatName('');
                setActiveChat(response.data.data.chats.length - 1);
            }
            catch (err) {
                setErr('Could not create new chat, please try again...');
            }
        }
    }

    const sidebarClass = ['sidebar'];
    isOpened
        ? sidebarClass.push('openSidebar')
        : sidebarClass.push('closeSidebar')


    let chatsAvailable;
    if (!chats) {
        chatsAvailable = <p>Loading...</p>;
    } else {
        chatsAvailable = chats.map((el, i) => {
            const chatClass = activeChat === i ? 'activeClass' : '';
            return <span
                key={i}
                className={chatClass}
                onClick={() => chatClickedHandler(el, i)}>{el.userId}</span>
        })
    }

    let newChatField;
    if (!addingNewChat) {
        newChatField = <span onClick={newChatHandler}>+ New Chat</span>
    } else {
        newChatField = (
            <div>
                <input
                    className="newChatInput"
                    placeholder="CHAT NAME"
                    value={newChatName}
                    onChange={newChatNameChangedHandler} />
                <div className="newChatActions">
                    <label
                        className="cancelNewChat"
                        onClick={cancelAddingNewChat}>Cancel</label>
                    <label
                        className="submitNewChat"
                        onClick={submitNewChatHandler}>Submit</label>
                </div>
                {userExists && <label
                    className="userExistsErr">Chat with this name exists...</label>}
            </div>
        )
    }

    return (
        <div className={sidebarClass.join(' ')}>
            <div className="chatList">
                {chatsAvailable}
                {newChatField}
            </div>
        </div>
    )
}

export default Sidebar;