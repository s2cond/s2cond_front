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
import Terms from 'pages/Terms';
import VerifyEmail from './pages/VerifyEmail';

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
        <Route path="/lounge" component={Lounge} />
      </Switch>
    </>
  );
};

const AppRouter = () => {
  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        await setUserObj(user);
        //Redux로 상태관리에 추가해서 auth 관리하기
      }
    });
  }, []);
  console.log('USEROBJ:', userObj);

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <Route path="/email" exact component={SignUpEmail} />
      <Route path="/signup/verifyphone" component={VerifyPhone} />
      <Route path="/signup/terms" component={Terms} />
      <Route path="/signup/verifyemail" component={VerifyEmail} />
      <ProtectedPages isLoggedIn={!!userObj} />
    </Switch>
  );
};

export default AppRouter;
