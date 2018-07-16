import { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      // ReactDOM.findDOMNode(this).scrollTop = 0;
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)