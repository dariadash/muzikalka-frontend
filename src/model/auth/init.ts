import { combine, sample } from 'effector'
import { authAccount } from '../../dal'
import {$login, $password, $walidationMessage, login, loginFx, setLogin, setPassword} from './index'

$login
    .on(setLogin, (_, login) => login)

$password
    .on(setPassword, (_, password) => password)

loginFx.use(({login, password}) => {
    return authAccount(login,password)
})

$walidationMessage
    .on(loginFx.fail,() => "ошибка короч")
    .reset([setLogin,setPassword])


loginFx.doneData.watch(({data}) => {
    console.log(data)
    localStorage.setItem('authToken', data.token)
})

sample({
    clock: login,
    target: loginFx,
    source: combine($login, $password, (l, p) => {
        return {
            login:l,
            password:p,
        }
    })
}) 
