import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import Landing from 'pages/Landing';
import { authService } from 'fbase';
import SignUp from './pages/SignUp';
import SignUpEmail from './pages/SignUpEmail';

const AppRouter = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        await setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  console.log(init, userObj);

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signup/email" component={SignUpEmail} />
    </Switch>
  );
};

export default AppRouter;
