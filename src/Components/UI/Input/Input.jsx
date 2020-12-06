import React, { useState } from "react";
import './Input.scss';

const Input = ({ type, inputChanged, initValue, fieldName }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [value, setValue] = useState(initValue);

    const handleInputChange = (ev) => {
        setValue(ev.target.value);
        setIsTouched(true);
        inputChanged(ev.target.value, fieldName)
    }

    return (
        <div className="inputContainer">
            <input
                className={isTouched && value.length === 0 ? 'inputErr' : ''}
                type={type}
                placeholder={fieldName}
                onChange={handleInputChange}
                value={value} />
            <label className="inputError">{isTouched && value.length === 0 ? 'Field required' : ''}</label>
        </div>
    )
}

export default Input;