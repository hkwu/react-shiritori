import './App.css';
import React, { Component } from 'react';
import Body from './Body';

export default class App extends Component {
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-head">
          <nav className="navbar is-warning">
            <div className="navbar-brand">
              <span className="navbar-item">しりとり</span>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <Body />
        </div>

        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <div className="columns has-text-centered">
                <div className="column">
                  <p className="is-size-5"><i className="fa fa-copyright" /> 2017 Kelvin Wu</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}
