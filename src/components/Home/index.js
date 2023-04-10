import {Component} from 'react'
import Header from '../Header'
import Stories from '../Stories'
import Posts from '../Posts'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Stories />
          <Posts />
        </div>
      </div>
    )
  }
}

export default Home
