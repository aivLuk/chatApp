import React, { useContext } from 'react';
import { UserContext } from '../../../contexts';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ toggleSidebar, sidebarOpened }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="header">
            <span className="material-icons profilePic">
                account_circle
            </span>
            <Link className="headerName" to='/profile'>{user.name}</Link>
            <span className="material-icons hamburger" onClick={toggleSidebar}>
                {sidebarOpened ? 'close ' : 'menu'}
            </span>
        </div>
    )
}

export default Header;