import React from 'react';
import { Route, BrowserRouter, Switch, useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $appLoaded, appload, $userAuthorized, $themePalette } from './model/app';
import { Auth } from './routes/Auth';
import Register from './routes/Register';
import { Songlist } from './routes/Songlist';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import { Profile } from './routes/Profile';

export const App = () => {
  const theme = useStore($themePalette)
  
  const appLoaded = useStore($appLoaded)
  React.useEffect(() => {
    appload()
  }, [])
  if (!appLoaded) {
    return <>Загрузка...</>
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <GuestRouterWrapper>
                  <Auth />
                </GuestRouterWrapper>
              </Route>
              <Route exact path="/registration">
                <GuestRouterWrapper>
                  <Register />
                </GuestRouterWrapper>
              </Route>
              <Route exact path="/songlist">
                <PrivateRouterWrapper>
                  <Songlist />
                </PrivateRouterWrapper>
              </Route>
              <Route exact path="/profile">
                <PrivateRouterWrapper>
                  <Profile />
                </PrivateRouterWrapper>
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </div>
  );
}

const PrivateRouterWrapper: React.FC = ({ children }) => {
  const history = useHistory()
  const appLoaded = useStore($appLoaded)
  const isAuth = useStore($userAuthorized)
  React.useEffect(() => {
    if (!isAuth) {
      history.replace('/')
    }
  }, [appLoaded, isAuth])
  return (<>{children}</>)
}

const GuestRouterWrapper: React.FC = ({ children }) => {
  const history = useHistory()
  const appLoaded = useStore($appLoaded)
  const isAuth = useStore($userAuthorized)
  React.useEffect(() => {
    if (isAuth) {
      history.replace('/songlist')
    }
  }, [appLoaded, isAuth])
  return (<>{children}</>)
}