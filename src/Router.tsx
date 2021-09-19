import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import qs from 'query-string';
import Landing from 'pages/Landing';
import SignUp from 'pages/SignUp';
import SignUpEmail from 'pages/SignUpEmail';
import VerifyPhone from 'pages/VerifyPhone';
import Login from 'pages/Login';
import Home from 'pages/Home';
import useLocationSearch from 'hooks/useLocationSearch';
import Terms from 'pages/Terms';
import VerifyEmail from 'pages/VerifyEmail';
import FindAccount from 'pages/FindAccount';
import FindPassword from 'pages/FindPassword';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Profile from 'pages/Profile';

const ProtectedPages = () => {
  const { pathname } = useLocation();
  const query = useLocationSearch();
  const auth = useSelector((state: RootState) => state.auth.user);
  //React-Persist를 사용할지 미지수!
  // home 이후에 접근하게 해줄 수 있는 척도가 필요함! 초대장이나 기타 등등..
  if (!auth) {
    const to =
      pathname !== '/'
        ? `?${qs.stringify({ ...query, redirectUrl: window.location.href })}`
        : '';
    return <Redirect to={to} />;
  }

  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />
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
      {/* <Route path="/userpage/:userId" component={MyPage} /> */}
      {/* <Route path="/signup/verifyphone" render={()=><VerifyPhone phoneNumber={auth.phoneNumber}/>}  /> */}
      <Route path="/signup/terms" component={Terms} />
      <Route path="/signup/verifyemail" component={VerifyEmail} />
      <Route path="/profile/:id" component={Profile} />
      <ProtectedPages />
    </Switch>
  );
};

export default AppRouter;
