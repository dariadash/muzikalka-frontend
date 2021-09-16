import React from 'react';
import {useStore} from 'effector-react'
import { Button, Input } from '@material-ui/core';
import { $login, $password, register, setLogin, setPassword } from '../model/register';

function Register() {
    const login = useStore($login)
    const password = useStore($password)
    return (
        <div>
            <h1>Registration</h1>
            <Input 
                autoFocus={true}
                color="primary"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <Input  
                color="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                color="primary"
                onClick={() => register()}
            >буп</Button>
        </div>

    )
}

export default Register;