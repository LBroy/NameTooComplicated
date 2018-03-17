import React, { Component } from 'react';
import Login from './components/Login';
import Sphere from './components/Sphere';
import Cone from './components/Cone';

//styles
import './styles/Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Sphere radius="4" />
        <Cone />
      </div>
    );
  }
}
