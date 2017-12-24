import PropTypes from 'prop-types'
import React from 'react'

class ScrollTo extends React.Component {
  render () {
    return (
      <a onClick={this.props.onClick.bind(null, this.props.to)} className='scroll-down'>
        <i className='ss-icon ss-navigatedown'></i>
      </a>
    )
  }

})

ScrollTo.PropTypes = {
  to: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default ScrollTo