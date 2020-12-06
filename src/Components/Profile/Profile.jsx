import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Profile.scss';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [editFields, setEditFields] = useState(false);
    const [newUserDetails, setNewUserDetails] = useState({ ...user })
    const history = useHistory();

    const cancelHandler = () => {
        editFields ? setEditFields(false) : history.push('/chat')
    }

    const editFieldsHandler = () => {
        if (editFields) {
            setUser(newUserDetails);
            setEditFields(false);
        } else {
            setEditFields(true);
        }
    }

    const inputChangedHandler = (val, inputType) => {
        const newDetails = { ...newUserDetails };
        newDetails[inputType] = val;
        setNewUserDetails(newDetails);
    }

    const profileDetails = [];
    for (let key in user) {
        profileDetails.push(
            {
                field: key,
                value: user[key]
            }
        )
    }
    const details = profileDetails.filter(el => el.field !== 'uid').map(el => {
        return (
            <div key={el.field} className="singleProfileInfo">
                <label>{el.field}</label>
                { editFields
                    ? <Input
                        type='text'
                        inputChanged={inputChangedHandler}
                        initValue={el.value}
                        fieldName={el.field} />
                    : <p>{el.value}</p>}
            </div>
        )
    })
    return (
        <div className="profileFormContainer">
            <h2>Profile details</h2>
            {details}
            <div className="buttonContainer">
                <Button
                    type='danger'
                    clicked={cancelHandler}
                    disabled={false}
                    message='CANCEL' />
                <Button
                    type='success'
                    clicked={editFieldsHandler}
                    disabled={false}
                    message={editFields ? 'SAVE' : 'EDIT'} />
            </div>
        </div>
    )
}

export default Profile