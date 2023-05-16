import Loader from 'react-loader-spinner'

import {Component} from 'react'

class Loading extends Component {
  render() {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    )
  }
}

export default Loading
