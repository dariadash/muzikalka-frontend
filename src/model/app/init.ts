import { createMuiTheme } from "@material-ui/core";
import { forward } from "effector";
import { $appLoaded, $theme, $themePalette, $userAuthorized, appload, getProfileFx, logout, toggleTheme } from ".";
import { getProfile } from "../../dal";
import { loginFx } from "../auth";

$appLoaded
    .on(getProfileFx.done, () => true)
    .on(getProfileFx.fail, () => true)

forward({
    from: appload,
    to:  getProfileFx
})

$userAuthorized
    .on(getProfileFx.done, () => true)
    .on(logout, () => false)
    .on(loginFx.doneData, () => true)

logout.watch(()=>{
    localStorage.clear()
})

$theme
    .on(toggleTheme, (s) => s === 'light' ? 'dark' : 'light')

forward({
    from: $theme.updates.map(
        (themeName) => createMuiTheme({
        palette: {
            type: themeName
        }}
    )),
    to: $themePalette
})
getProfileFx.use(() => getProfile())