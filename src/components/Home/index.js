import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Home extends Component {
  constonClickLogout = () => <Redirect to="/login" />

  render() {
    return (
      <>
        <div className="home-container">
          <button type="button" onClick={this.onClickLogout}>
            LOG OUT
          </button>
        </div>
      </>
    )
  }
}

export default Home
