import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dyn5sg1qn/image/upload/v1680963946/erroring_1_jqfusf.png"
      alt="page not found"
      className="not-found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="description">
      We are sorry, the page you requested could not be found <br /> Please go
      back to the homepage
    </p>
    <Link to="/" className="link">
      <button className="go-home-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
