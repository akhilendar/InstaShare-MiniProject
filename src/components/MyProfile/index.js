import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Header from '../Header'
import Loading from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}
class MyProfile extends Component {
  state = {
    userPostDetails: {},
    postDetails: [],
    storyDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getUpdatedData = eachItem => ({
    followerCount: eachItem.followers_count,
    followingCount: eachItem.followers_count,
    id: eachItem.id,
    postCount: eachItem.posts_count,
    profilePicture: eachItem.profile_pic,
    userBio: eachItem.user_bio,
    userId: eachItem.user_id,
    userName: eachItem.user_name,
  })

  getUpdatedPostAndStory = data => ({
    id: data.id,
    image: data.image,
  })

  getMyProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    console.log(userId)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getUpdatedData(fetchedData.profile)
      const updatedPost = fetchedData.profile.posts.map(eachData =>
        this.getUpdatedPostAndStory(eachData),
      )
      const updatedStory = fetchedData.profile.stories.map(eachData =>
        this.getUpdatedPostAndStory(eachData),
      )
      this.setState({
        userPostDetails: updatedData,
        postDetails: updatedPost,
        storyDetails: updatedStory,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserDetails = () => {
    const {userPostDetails, postDetails, storyDetails} = this.state
    const {
      followerCount,
      followingCount,
      postCount,
      profilePicture,
      userBio,
      userName,
      userId,
    } = userPostDetails

    const textColor = 'list-text-light-theme'

    return (
      <div className="user-Details-Container">
        <div className="user-Details-content">
          <div className="profile-container">
            <img
              className="profile-img"
              src={profilePicture}
              alt="my profile"
            />

            <div className="user-post-detail-container">
              <h1 className={`profile-name ${textColor}`}>{userName}</h1>
              <ul className="user-follower-container">
                <li>
                  <p className={`post-count ${textColor}`}>
                    {' '}
                    <span className={`count ${textColor}`}>{postCount} </span>
                    posts
                  </p>
                </li>
                <li>
                  <p className={`post-count ${textColor}`}>
                    {' '}
                    <span className={`count ${textColor}`}>
                      {followerCount}
                    </span>
                    followers
                  </p>
                </li>
                <li>
                  <p className={`post-count ${textColor}`}>
                    <span className={`count ${textColor}`}>
                      {followingCount}
                    </span>
                    following
                  </p>
                </li>
              </ul>
              <p className={`post-count count ${textColor}`}>{userId}</p>
              <p className={`post-count ${textColor}`}>{userBio}</p>
            </div>
          </div>
          <div className="users-all-post">
            <ul className="user-story-container">
              {storyDetails.map(eachStory => (
                <li key={eachStory.id} className="story-item">
                  <img
                    className="user-story"
                    src={eachStory.image}
                    alt="my story"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="user-all-post-container">
            <div className="users-all-post">
              <BsGrid3X3 size={15} className={textColor} />
              <h1 className={`post-count ${textColor}`}>Posts</h1>
            </div>
            {postDetails.length > 0 ? (
              <ul className="all-post-container">
                {postDetails.map(eachPost => (
                  <li className="all-post-img" key={eachPost.id}>
                    <img
                      className="posted-img"
                      src={eachPost.image}
                      alt="my post"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-post-container">
                <BiCamera className={`No-post-available ${textColor}`} />
                <h1 className={`post-count ${textColor}`}>No Posts Yet</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getMyProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649208425/Icon_1_qfbohw.png"
        alt="failure view"
      />
      <p className="no-found-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="home-page-btn"
        onClick={this.onClickRetry}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => <Loading />

  renderAllUserDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="nav-bg-light">{this.renderAllUserDetails()}</div>
      </>
    )
  }
}

export default MyProfile
