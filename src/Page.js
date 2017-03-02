import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import pages from './pages'
import Section from './Section'

class Page extends Component {

  constructor() {
    super()
    this.state={
      page:null
    }
  }

  componentWillUpdate(props){
    if(props.page!==this.state.page){
      this.page.scrollTop = 0
      this.setState({page: props.page})
    }
  }

  scrollToTop(element, scrollDuration, scrollTarget) {
    const initial = element.scrollTop,
          distance = scrollTarget - initial
    const step = distance / scrollDuration
    var scrollCount = initial,
        count = scrollDuration
    function go() {
      scrollCount += step
      element.scrollTop = Math.round(scrollCount)
      count --
      if (count===0) return;
      window.requestAnimationFrame(go);
    }
    if(step !== 0) {
      window.requestAnimationFrame(go);
    }
  }

  render() {
    const page = pages.filter((p)=>p.title===this.props.page)[0]
    const { child } = this.props
    if(this[child]){
      //this.page.scrollTop = this[child].offsetTop - 16
      this.scrollToTop(this.page, 18, this[child].offsetTop - 16)
    }
    return (
      <div ref={ref => this.page = ref} className={this.props.fullWidth ? "page page-fullwidth" : 
        this.props.smallScreen ? "page page-fullwidth" : "page page-partwidth"}>
        <div style={{padding:20}}>
          <div className="pic-wrap" style={{backgroundImage:`url('./pix/${page.pic}.jpg')`}}>
            <div className="page-title">{this.props.page}</div>
          </div>
          <br/>
          {page.children.map((child, i)=>
            <div ref={ref => this[child] = ref} key={i}>
              <Section section={child} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Page;
