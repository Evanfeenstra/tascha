import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import subpages from './subpages'

class Section extends Component {

  constructor() {
    super()
    this.state={
    }
  }

  render() {
    const { section } = this.props
    const subpage = subpages[section]
    if(!subpage){
      return <div/>
    }
    return (
      <div className="section">
        {subpage.pic && <div className="section-pic"><img src={`pix/${subpage.pic}.jpg`} style={{width:'100%'}}/></div>}
        <div className="section-header">{section}</div>
        {subpage.intro && <p className="section-intro">{subpage.intro}</p>}
        {subpage.quote && <p className="section-quote">"{subpage.quote}"</p>}
        {subpage.questions && <div>
          Questions:
          <ul className="section-questions">
            {subpage.questions.map((q, i)=>
              <li key={i}>{q}</li>
            )}
          </ul>
        </div>}
      </div>
    );
  }
}

export default Section;
