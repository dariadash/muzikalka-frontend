import { combine, sample } from 'effector'
import { $login, $password, register, registerFx, setLogin, setPassword } from "./index";
import { createAccount } from '../../dal';

$login
    .on(setLogin,(_,login) => login)

$password
    .on(setPassword,(_,password) => password)

registerFx.use(({login,password}) => createAccount(login,password))

const $loginAndPassword = combine(
    $login,
    $password, 
    (login,password) => ({login,password})
)

sample({
    // Данные которые пойдут на вход в пэйлоад эффекта
    source: $loginAndPassword,
    // Эффект который будет вызван
    target: registerFx,
    // Что сподвигнет вызвать эффект
    clock: register,
})

registerFx.done.watch(()=>{
    alert('REGISTER FX ЗАВЕРШИЛСЯ!')
})
