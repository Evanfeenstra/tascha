import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'

const nodes = [

  {
    title: 'Overview',
    children:[
      'Hardware',
      'Connections',
      'The Internet',
      'Navigation',
      'Data Storage',
      'PROJECT: Take a Picture'
    ]
  },

  {
    title: 'Online Identity',
    children:[
      'Personal Data',
      'Making Accounts',
      'Email',
      'Netiquette',
      'Online presence',
      'PROJECT: Send an email'
    ]
  },

  {
    title: 'Communication',
    children:[
      'SMS',
      'The App Store',
      'Messaging Apps',
      'Social Media',
      'PROJECT: Start a group chat'
    ]
  },

  {
    title: 'Information',
    children:[
      'Evaluating Information',
      'Google Search',
      'Youtube',
      'PROJECT: Find a article',
    ]
  },

  {
    title:'Productivity',
    children:[
      'Calendar / Reminders',
      'Google Docs',
      'Other Services',
      'Keeping things updated',
      'PROJECT: Collaborative Doc',
    ]
  }
]

const SidebarNodeChild = (props) => {
  const { child } = props
  return (
    <div className="sidebar-child">{child}</div>
  )
}

const SidebarNode = (props) => {
  const { node, onClick, selected } = props 
  return(
    <div style={{background: '#007744'}}>
      <div className="sidebar-node" onClick={() => onClick(node.title)} style={selected===node.title ? {background: '#4455AA'} : {}}>
        <svg className="sidebar-node-carat" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 96 96" enableBackground="new 0 0 96 96"
          style={{transform: selected===node.title ? 'rotate(0deg)' : 'rotate(-90deg)'}}>
          <path fill="white" d="M96 33.713l-3.763-3.763c-3.598-3.598-9.43-3.6-13.031-.006l-31.22 31.144-31.271-31.195c-3.601-3.594-9.355-3.513-12.952.085l-3.763 3.763 47.952 48.02.034-.034.034.034 47.98-48.048z"/>
        </svg>
        <span style={{fontWeight:selected===node.title ? 'bold':'normal'}}>
          {node.title}
        </span>
      </div>
      <CSSTransitionGroup transitionName="collapser" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {selected===node.title ?
          <div className="collapser">
            <div style={{fontSize:'12px', padding:9}}>
              {node.children.map((child, i)=>
                  <SidebarNodeChild key={i} child={child} />
              )}
            </div>
          </div>
        : null}
      </CSSTransitionGroup>
    </div>
  )
}


class Sidebar extends Component {

  constructor() {
    super()
    this.state={
      selected:'',
    }
  }

  onClick = (title) => {
    this.setState({ selected: title === this.state.selected ? '' : title })
    this.props.setPage(title)
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-top-shadow"></div>
        {nodes.map((node, i)=>
            <SidebarNode key={i} node={node} onClick={this.onClick} selected={this.state.selected} />
        )}
      </div>
    );
  }
}

export default Sidebar;
