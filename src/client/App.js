// packages import
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './Landing';
// files import
import './styles/App.css';
import { observer } from 'mobx-react';
import SceneStore from './stores/SceneStore';

@observer
export default class App extends Component {
  toggleForm = set => {
    this.props.store.toggleForm(set);
  };

  renderLoginForm() {
    // const store = this.props.store;
    return (
      <div className="loginForm">
        <div id="close" onClick={this.toggleForm.bind(this, false)} />
        <Login />
      </div>
    );
  }

  render() {
    // const store = this.props.store;
    return (
      <div className="main-container">
        <div className="title-bar">
          <div className="title-bar-text">Draw.Squad</div>
          <div className="buttons-container">
            <div
              className="profile-container"
              onClick={this.toggleForm.bind(true)}
            >
              <div className="profile-name">
                {this.props.store.username || 'login'}
              </div>
              <div id="profile-icon" />
            </div>
          </div>
        </div>
        {this.props.store.closeForm ? this.renderLoginForm() : <div />}
        <Landing store={SceneStore} />
      </div>
    );
  }
}
