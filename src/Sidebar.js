import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import pages from './pages'

const SidebarNodeChild = (props) => {
  const { child, clickChild } = props
  return (
    <div className="sidebar-child" onClick={()=>{clickChild(child)}}>{child}</div>
  )
}

const SidebarNode = (props) => {
  const { node, onClick, selected, clickChild } = props 
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
                  <SidebarNodeChild key={i} child={child} clickChild={clickChild} />
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
      selected:'The Basics',
    }
  }

  onClick = (title) => {
    this.setState({ selected: title === this.state.selected ? '' : title })
    this.props.setPage(title)
  }

  render() {
    return (
      <div style={{height:'calc(100% - 50px)'}}>
        <CSSTransitionGroup transitionName="underlay" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          { this.props.smallScreen && !this.props.hidden ?
            <div className="sidebar-underlay" onClick={this.props.closeSidebar}></div>
          : null }
        </CSSTransitionGroup>
        <div className={this.props.hidden ? "sidebar hidden" : "sidebar"} style={{zIndex:100}}>
          <div className="sidebar-top-shadow"></div>
          {pages.map((node, i) =>
              <SidebarNode key={i} node={node} onClick={this.onClick} selected={this.state.selected} 
                clickChild={this.props.setChild} />
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
