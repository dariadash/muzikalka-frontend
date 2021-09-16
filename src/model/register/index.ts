import {createDomain} from 'effector'

const d = createDomain()

export const $login = d.store('')
export const setLogin = d.event<string>()
export const $password = d.store('')
export const setPassword = d.event<string>()

export const register = d.event()

// эффекты
type RegisterFxPayload = {
    login: string
    password: string
}
export const registerFx = d.createEffect<RegisterFxPayload,{},{}>()
