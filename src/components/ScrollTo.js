import PropTypes from 'prop-types'
import React from 'react'

const ScrollTo = ({ onClick, to }) => {
  return (
    <a onClick={() => onClick(to)} className='scroll-down'>
      <i className='ss-icon ss-navigatedown'></i>
    </a>
  )
})

ScrollTo.PropTypes = {
  to: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

export default ScrollTo