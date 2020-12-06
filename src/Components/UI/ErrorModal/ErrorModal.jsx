import React from 'react';
import Button from '../Button/Button';
import './ErrorModal.scss';

const ErrorModal = ({ errMsg, setErr }) => {
    return (
        <div>
            <div className="errModal">
                <h3>{errMsg}</h3>
                <Button
                    clicked={() => setErr(false)}
                    type='danger'
                    message='CLOSE'
                    disabled={false} />
            </div>
            <div className="errBackdrop" />
        </div>
    )
}

export default ErrorModal;