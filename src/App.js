import React, { Component } from 'react';
import './App.css';
import Calculator from './Calculator'

function WorksOfflineAlert() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <div id="works-offline-alert" className="d-none alert alert-info alert-dismissible fade show" role="alert">
          <strong>This web app works offline!</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <React.Fragment>
      <div className="spacing d-none d-md-block"></div>
      <h1 className="text-center">freeCodeCamp Calculator</h1>
      <div className="spacing d-none d-md-block"></div>
    </React.Fragment>
  );
}

function Footer() {
  return (
    <p id="footer" className="text-center">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/thebeastbelow/fcc-calculator">
          see source code
        </a>
    </p>
  );
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <WorksOfflineAlert />
        <Calculator />
        <Footer />
      </div>
    );
  }
}

export default App;
