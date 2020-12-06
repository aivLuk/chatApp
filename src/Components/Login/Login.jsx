import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { useHistory } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Login.scss';

const inputFields = ['email', 'password'];

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const signinHandler = () => {
        const user = {
            uid: Date.now(),
            name: 'Jimmy Mcnuggets',
            'user name': 'jimmylicious',
            email: email
        }
        setUser(user);
        history.replace('/chat');
    }

    const inputChangedHandler = (val, inputType) => {
        inputType === "email" ? setEmail(val) : setPassword(val);
    }

    const inpts = inputFields.map(el => (
        <Input
            key={el}
            type={el}
            inputChanged={inputChangedHandler}
            initValue=''
            fieldName={el} />
    ))

    return (
        <div>
            <h1>WELCOME TO CHAT ROOM</h1>
            <div className="formContainer">
                {inpts}
                <Button
                    type='success'
                    clicked={signinHandler}
                    disabled={!email.length || !password.length}
                    message='Sign in' />
            </div>
        </div>
    )
}

export default Login;