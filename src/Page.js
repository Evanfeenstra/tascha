import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Page extends Component {

  constructor() {
    super()
    this.state={
    }
  }

  render() {
    return (
      <div className="page">
        <div style={{padding:20}}>
          {this.props.page}
        </div>
      </div>
    );
  }
}

export default Page;
