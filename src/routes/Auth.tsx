import React from 'react'
import { useStore } from 'effector-react'
import { Button, Container, Input, Switch } from '@material-ui/core'
import { $login, $password, setLogin, setPassword, login as auth, $walidationMessage } from '../model/auth'
import { toggleTheme } from '../model/app'


export const Auth = () => {
    const login = useStore($login)
    const password = useStore($password)
    const walid = useStore($walidationMessage)
    
    return <div>
        <Container maxWidth="lg">
            <p>{walid}</p>
            <div className="center">
                <Input value={login} onChange={(e) => setLogin(e.target.value)} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={() => auth()}>Войти</Button>
            </div>
            <Switch color="primary" size="small" onClick={() => toggleTheme()}/>
        </Container>
    </div>
}

