import React from 'react';
import AppRouter from 'Router';
import Nav from 'components/Nav';
import Footer from 'components/Footer';

function App() {
  return (
    <>
      <Nav />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
