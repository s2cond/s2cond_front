import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import qs from 'query-string';
import Landing from 'pages/Landing';
import SignUp from 'pages/SignUp';
import SignUpEmail from 'pages/SignUpEmail';
import VerifyPhone from 'pages/VerifyPhone';
import Login from 'pages/Login';
import Lounge from 'pages/Lounge';
import useLocationSearch from 'hooks/useLocationSearch';
import Terms from 'pages/Terms';
import VerifyEmail from 'pages/VerifyEmail';
import FindAccount from 'pages/FindAccount';
import FindPassword from 'pages/FindPassword';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const ProtectedPages = () => {
  const { pathname } = useLocation();
  const query = useLocationSearch();
  const auth = useSelector((state: RootState) => state.auth.user);
  console.log(auth);
  //React-Persist를 사용할지 미지수!
  if (!auth.isLoggedIn) {
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
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <Route path="/findaccount" component={FindAccount} />
      <Route path="/findpassword" component={FindPassword} />
      <Route path="/email" exact component={SignUpEmail} />
      <Route path="/signup/verifyphone" component={VerifyPhone} />
      {/* <Route path="/signup/verifyphone" render={()=><VerifyPhone phoneNumber={auth.phoneNumber}/>}  /> */}
      <Route path="/signup/terms" component={Terms} />
      <Route path="/signup/verifyemail" component={VerifyEmail} />
      <ProtectedPages />
    </Switch>
  );
};

export default AppRouter;
