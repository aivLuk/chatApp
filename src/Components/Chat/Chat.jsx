import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from './ChatWindow/ChatWindow';
import Header from './Header/Header';
import InputBox from './InputBox/InputBox';
import Sidebar from './Sidebar/Sidebar';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import { ChatContext } from '../../contexts';
import { fetchData } from '../../utils';
import './Chat.scss';

const Chat = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const [error, setError] = useState(null);
    const { chats, setChats, chatSelected, setChatSelected } = useContext(ChatContext);

    useEffect(() => {
        if (!chats) {
            const uploadData = async () => {
                try {
                    const response = await fetchData();
                    setChats(response.data.chats);
                    setChatSelected(response.data.chats[0]);
                }
                catch (err) {
                    setError('Fetching chat data failed, try refreshing the page...')
                }
            }
            uploadData();
        }
    }, [])

    const toggleSidebar = () => {
        setSidebarOpened(prevState => !prevState);
    }

    return (
        <div>
            <Header
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened} />
            <div className="chatContainer">
                <ChatWindow
                    chat={chatSelected}
                    setErr={setError} />
                <InputBox
                    allChats={chats}
                    editChats={setChats}
                    currChat={chatSelected}
                    selectChat={setChatSelected}
                    setErr={setError} />
            </div>
            <Sidebar
                isOpened={sidebarOpened}
                chats={chats}
                editChats={setChats}
                setCurrentChat={setChatSelected}
                setErr={setError} />
            {error && <ErrorModal
                errMsg={error}
                setErr={setError} />}
        </div>
    )
}

export default Chat;