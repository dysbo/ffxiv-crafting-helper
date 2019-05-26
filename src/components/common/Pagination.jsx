import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'react-bootstrap'

export default class Pagination extends React.Component {
  constructor (props) {
    super(props)
    const { currentPage, handlePageChange, totalPages } = props
    const minPage = Math.max(1, Math.min(currentPage - 3, totalPages - 6))
    const maxPage = Math.min(totalPages, minPage + 6)

    const options = []

    if (totalPages > 7) {
      options.push((
        <Button
          key="first"
          value={1}
          onClick={handlePageChange}
          disabled={currentPage === 1}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          &lt;&lt;
        </Button>
      ))
    }

    if (totalPages > 1) {
      options.push((
        <Button
          key="prev"
          value={Math.max(currentPage - 1, 1)}
          onClick={handlePageChange}
          disabled={currentPage === 1}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          &lt;
        </Button>
      ))
    }

    if (totalPages > 7) {
      options.push((
        <Button
          key="prevGroup"
          value={Math.max(1, currentPage - 7)}
          onClick={handlePageChange}
          disabled={minPage === 1}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          ...
        </Button>
      ))
    }

    for (let i = minPage; i <= maxPage; i++) {
      const activePage = i === currentPage
      const option = (
        <Button
          key={i}
          value={i}
          onClick={handlePageChange}
          variant={activePage ? 'primary' : 'light'}
          // style={{ border: '1px solid #def' }}
        >
          {i}
        </Button>
      )

      options.push(option)
    }

    if (totalPages > 7) {
      options.push((
        <Button
          key="nextGroup"
          value={Math.min(totalPages, currentPage + 7)}
          onClick={handlePageChange}
          disabled={maxPage === totalPages}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          ...
        </Button>
      ))
    }

    if (totalPages > 1) {
      options.push((
        <Button
          key="next"
          value={Math.min(currentPage + 1, totalPages)}
          onClick={handlePageChange}
          disabled={currentPage === totalPages}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          &gt;
        </Button>
      ))
    }

    if (totalPages > 7) {
      options.push((
        <Button
          key="last"
          value={totalPages}
          onClick={handlePageChange}
          disabled={currentPage === totalPages}
          variant="primary"
          // style={{ border: '1px solid #def' }}
        >
          &gt;&gt;
        </Button>
      ))
    }

    this.state = {
      options
    }
  }

  render () {
    const { options } = this.state
    return (
      <div>
        <ButtonGroup>
          {options}
        </ButtonGroup>
      </div>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
}
