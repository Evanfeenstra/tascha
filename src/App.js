import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Page from './Page'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state={
      page:'The Basics',
      child:null,
      sidebarHidden:true,
      smallScreen:true,
    }
  }

  componentDidMount(){
    window.onresize = function(event) {
      this.resize(event.target.innerWidth)
    }.bind(this)
    this.resize(window.innerWidth)

    /*const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-sw&key=trnsl.1.1.20170301T055600Z.4c09fad6726f09eb.0330677f9c3bc27d0e092786ff665e4e451084e2&text=me'
    axios(url, {
      method:'post',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((data) => {
      console.log(data)
    })*/
  }

  resize = (w) => {
    if(w<=800 && !this.state.smallScreen){
      this.setState({smallScreen: true, sidebarHidden: true})
    }
    if(w>800 && this.state.smallScreen){
      this.setState({smallScreen: false, sidebarHidden:false})
    }
  }

  setPage = (title) => {
    this.setState({ page: title })
  }

  toggleSidebar = () => {
    this.setState({ sidebarHidden: !this.state.sidebarHidden })
  }

  setChild = (child) => {
    this.setState({child})
    setTimeout(()=>{
      this.setState({child:null})
    },100)
    if(this.state.smallScreen){
      this.setState({sidebarHidden: true})
    }
  }

  closeSidebar = () => {
    this.setState({sidebarHidden: true})
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <header>
          <div className="hamburger-icon" onClick={this.toggleSidebar}>
            <svg height="24" width="24" viewBox="0 0 32 32" version="1.1"
                 enableBackground="new 0 0 32 32"xmlns="http://www.w3.org/2000/svg">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
            </svg>
          </div>
          <div className="header-text">
            Mobile Literacy Curriculum
          </div>
        </header>
        <Sidebar setPage={this.setPage} hidden={this.state.sidebarHidden} smallScreen={this.state.smallScreen} 
          setChild={this.setChild} closeSidebar={this.closeSidebar} />
        <Page page={this.state.page} fullWidth={this.state.sidebarHidden} smallScreen={this.state.smallScreen} 
          child={this.state.child} />
      </div>
    );
  }
}

export default App;
