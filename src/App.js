import React from 'react';
import "./App.css";
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
    <Header/>
    <main className='main'>
      <Body/>
    </main>
    <Footer/>
    </>
  );
}

export default App;
