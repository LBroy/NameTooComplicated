import React, { Component } from 'react';
import Sphere from './components/Sphere';
import Cone from './components/Cone';
import Plane from './components/Plane';
import SceneToolbar from './components/SceneToolbar';

import './styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }
  addPlane() {
    var children = this.state.children;
    children.push(<Plane />);
    this.setState({ children: children });
  }
  addSphere() {
    var children = this.state.children;
    children.push(<Sphere radius={3} />);
    this.setState({ children: children });
  }
  addCone() {
    var children = this.state.children;
    children.push(<Cone />);
    this.setState({ children: children });
  }
  renderChildren() {
    return this.state.children;
  }

  render() {
    return (
      <div>
        <Plane />
        {this.renderChildren()}
        <SceneToolbar
          addPlane={this.addPlane.bind(this)}
          addSphere={this.addSphere.bind(this)}
          addCone={this.addCone.bind(this)}
        />
      </div>
    );
  }
}

export default Landing;
