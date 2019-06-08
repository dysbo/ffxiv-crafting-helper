import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { get } from 'lodash'
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default class XivIcon extends React.Component {
  render () {
    const { badge, className, image, tooltip } = this.props

    const htmlImage = (
      <img src={image.url} alt={image.altText} />
    )

    const content = get(tooltip, 'text') ? (
      <OverlayTrigger overlay={(
        <Tooltip>
          {get(tooltip, 'text')}
        </Tooltip>
      )}>
        {htmlImage}
      </OverlayTrigger>
    ) : htmlImage

    const htmlBadge = get(badge, 'text') ? (
      <React.Fragment>
        <br />
        <Badge variant={get(badge, 'variant', 'primary')} className="xiv-icon-badge">
          {get(badge, 'text')}
        </Badge>
      </React.Fragment>
    ) : null

    return (
      <div className={cx(className)}>
        {content}
        {htmlBadge}
      </div>
    )
  }
}

XivIcon.propTypes = {
  badge: PropTypes.shape({
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'light', 'dark']),
    text: PropTypes.string.isRequired
  }),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  image: PropTypes.shape({
    altText: PropTypes.string.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    url: PropTypes.string.isRequired
  }).isRequired,
  tooltip: PropTypes.shape({
    text: PropTypes.string.isRequired
  })
}

XivIcon.defaultProps = {
  badge: {
    variant: 'primary'
  }
}
