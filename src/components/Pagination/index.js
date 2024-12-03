import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  state = {pageNo: 1}

  onClickPrev = () => {
    const {pageNo} = this.state
    const {apiCallback} = this.props

    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        () => {
          const {pageNo} = this.state
          apiCallback(pageNo)
        },
      )
    }
  }

  onClickNext = () => {
    const {pageNo} = this.state
    const {totalPages, apiCallback} = this.props

    if (pageNo < totalPages) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        () => {
          const {pageNo} = this.state
          apiCallback(pageNo)
        },
      )
    }
  }

  render() {
    const {pageNo} = this.state

    return (
      <div className="pagination-container">
        <button
          className="page-button"
          type="button"
          onClick={this.onClickPrev}
        >
          Prev
        </button>
        <p className="page-text">{pageNo}</p>
        <button
          className="page-button"
          type="button"
          onClick={this.onClickNext}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
