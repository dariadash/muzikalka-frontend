import { createDomain } from "effector";

const d = createDomain()

// сторы
export const $login = d.store('')
export const $password = d.store('')
export const $walidationMessage = d.store<string | null>(null)

// события
export const setLogin = d.event<string>()
export const setPassword = d.event<string>()
export const login = d.event()

// эффекты
type LoginPayload = {
    login: string
    password: string
}
export const loginFx = d.effect<LoginPayload,any,any>()
