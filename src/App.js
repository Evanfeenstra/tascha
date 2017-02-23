import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Page from './Page'

class App extends Component {

  constructor() {
    super()
    this.state={
      page:'',
    }
  }

  setPage = (title) => {
    this.setState({ page: title })
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <header>
          <span style={{fontWeight:100, fontSize:24}}>
            Mobile Literacy Curriculum
          </span>
        </header>
        <Sidebar setPage={this.setPage} />
        <Page page={this.state.page} />
      </div>
    );
  }
}

export default App;
