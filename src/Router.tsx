import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import qs from 'query-string';
import firebase from 'firebase/app';
import Landing from 'pages/Landing';
import { authService } from 'fbase';
import SignUp from './pages/SignUp';
import SignUpEmail from './pages/SignUpEmail';
import VerifyPhone from './pages/VerifyPhone';
import Login from './pages/Login';
import Lounge from './pages/Lounge';
import useLocationSearch from './hooks/useLocationSearch';

type Props = {
  isLoggedIn: boolean;
};
const ProtectedPages: React.FC<Props> = ({ isLoggedIn }) => {
  const { pathname } = useLocation();
  const query = useLocationSearch();

  if (!isLoggedIn) {
    const to =
      pathname !== '/'
        ? `?${qs.stringify({ ...query, redirectUrl: window.location.href })}`
        : '';
    return <Redirect to={to} />;
  }

  return (
    <>
      <Switch>
        <Route path="/email" exact component={SignUpEmail} />
        <Route path="/signup/verifyphone" component={VerifyPhone} />
        <Route path="/lounge" component={Lounge} />
      </Switch>
    </>
  );
};

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        await setUserObj(user);
      }
    });
  }, []);
  console.log(isLoggedIn, userObj);

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <ProtectedPages isLoggedIn={isLoggedIn} />
    </Switch>
  );
};

export default AppRouter;
