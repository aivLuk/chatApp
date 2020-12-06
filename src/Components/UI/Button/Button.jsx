import React from 'react';
import './Button.scss';

const Button = ({ clicked, type, message, disabled }) => (
    <button
        className={type}
        onClick={clicked}
        disabled={disabled}>{message}</button>
)

export default Button;