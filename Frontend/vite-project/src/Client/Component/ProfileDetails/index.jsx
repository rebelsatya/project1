import Cookies from 'js-cookie'
import {Component} from 'react'

import { Oval } from 'react-loader-spinner';


import './index.css'

const responseStatus = {
  responseInitial: 'initail',
  responseSuccess: 'success',
  responseFailure: 'failure',
  responseInProgress: 'INPROGRESS',
}

class ProfileDetails extends Component {
  state = {reponseStatus: responseStatus.responseInitial, datalist: []}

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      reponseStatus: responseStatus.responseInProgress,
    })

    const jwtToken = Cookies.get('User_access')
    const Apiurl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(Apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      const UpdatedList = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        datalist: UpdatedList,
        reponseStatus: responseStatus.responseSuccess,
      })
    } else {
      this.setState({
        reponseStatus: responseStatus.responseFailure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Oval type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="bg-card11">
      <button
        type="button"
        data-testid="button"
        className="job-item-failure-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {datalist} = this.state
    const {name, profileImageUrl, shortBio} = datalist
    return (
      <div className="bg-card10">
        <div>
          <img src={profileImageUrl} className="img5" alt="profile" />
          <h1 className="heading">{name}</h1>
          <p className="para">{shortBio}</p>
        </div>
      </div>
    )
  }

  render() {
    const {reponseStatus} = this.state

    switch (reponseStatus) {
      case responseStatus.responseSuccess:
        return this.renderSuccessView()
      case responseStatus.responseFailure:
        return this.renderFailureView()
      case responseStatus.responseInProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProfileDetails
