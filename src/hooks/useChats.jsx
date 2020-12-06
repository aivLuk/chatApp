import { useState } from 'react';

const useChats = () => {
    const [chats, setChats] = useState(null);
    const [chatSelected, setChatSelected] = useState(null);
    const [activeChat, setActiveChat] = useState(0);

    return {
        chats,
        setChats,
        chatSelected,
        setChatSelected,
        activeChat,
        setActiveChat
    };
}

export default useChats;