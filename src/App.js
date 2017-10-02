import React, { Component } from 'react';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

export default class App extends Component {
  render() {
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
}
