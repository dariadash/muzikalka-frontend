import { createMuiTheme, Theme } from "@material-ui/core";
import { createDomain } from "effector";

const d = createDomain()

export const $appLoaded = d.store<boolean>(false)
export const $userAuthorized = d.store(false)
export const appload = d.event<void>()
export const getProfileFx = d.effect<any, any, any>()
export const logout = d.event()

export const $themePalette = d.store<Theme>(
    createMuiTheme({
        palette: {
            type: 'light'
        }
    })
)
export const $theme = d.store<'light' | 'dark'>('light')
export const toggleTheme = d.event()

