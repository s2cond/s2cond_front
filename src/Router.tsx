import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import Landing from 'pages/Landing';
import { authService } from 'fbase';

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

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default AppRouter;
