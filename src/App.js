import './App.scss';
import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Chat from './Components/Chat/Chat';
import { UserContext, ChatContext } from './contexts';
import useManageUser from './hooks/useManageUser';
import useChats from './hooks/useChats';

function App() {
  const user = useManageUser();
  const chats = useChats();

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <ChatContext.Provider value={chats}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/chat" exact component={Chat} />
            <Redirect to="/" />
          </Switch>
        </ChatContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
