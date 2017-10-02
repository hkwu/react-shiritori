import React from 'react';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-head">
        <Header />
      </div>
      <div className="hero-body">
        <Body />
      </div>
      <div className="hero-foot">
        <Footer />
      </div>
    </section>
  );
}
