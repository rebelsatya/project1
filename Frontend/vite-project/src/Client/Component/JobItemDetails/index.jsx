import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner';

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'

import {BiLinkExternal} from 'react-icons/bi'
import {Component} from 'react'
import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'


import './index.css'

const responseStatus = {
  responseInitial: 'initail',
  responseSuccess: 'success',
  responseFailure: 'failure',
  responseInProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    reponseStatus: responseStatus.responseInitial,
    jobdetails: {},
    similarJoblist: [],
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getProfileDetails = async () => {
    this.setState({
      reponseStatus: responseStatus.responseInProgress,
    })
   
    const jobId = window.location.pathname.split('/')[2]; 
    console.log(jobId) 

    const jwtToken = Cookies.get('User_access')
    const Apiurl = `https://apis.ccbp.in/jobs/${jobId}`
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
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(s => ({
          imageUrl: s.image_url,
          name: s.name,
        })),
      }

      const updatedSkills = data.similar_jobs.map(s =>
        this.getFormattedSkillData(s),
      )

      this.setState({
        jobdetails: UpdatedList,
        similarJoblist: updatedSkills,
        reponseStatus: responseStatus.responseSuccess,
      })
    } else {
      this.setState({
        reponseStatus: responseStatus.responseFailure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobdetails, similarJoblist} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      lifeAtCompany,
      title,
      skills,
    } = jobdetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="bg-container4">
        <div className="bg-container3">
          <div className="bg-jobcard1">
            <img
              src={companyLogoUrl}
              className="img-company-logo"
              alt="job details company logo"
            />
            <div className="bg-jobcard3">
              <h1 className="heading-job">{title}</h1>
              <div className="bg-jobcard1">
                <AiFillStar className="star-icon" size="25px" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="bg-jobcard2">
            <div className="bg-jobcard1">
              <div className="bg-jobcard1">
                <HiLocationMarker size="25px" className="spacing" />
                <p className="para1">{location}</p>
              </div>
              <div className="bg-jobcard1">
                <HiMail size="25px" className="spacing" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="heading-jobcard">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line2" />
          <div className="access-link-card">
            <h1 className="heading-jobcard">Description</h1>

            <a href={companyWebsiteUrl} className="visit-link">
              Visit <BiLinkExternal size="25px" />
            </a>
          </div>

          <p className="para2">{jobDescription}</p>
          <div>
            <h1 className="heading-jobcard">Skills</h1>
            <ul className="skill-container ">
              {skills.map(each => (
                <SkillsCard g={each} key={each.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="heading-jobcard">Life at Company</h1>
            <div className="bg-card-job-description">
              <p className="para-job-description">{description}</p>
              <img
                src={imageUrl}
                className="img-job-description"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="heading-jobcard">Similar Jobs</h1>
        <ul className="bg-container-similar">
          {similarJoblist.map(each => (
            <SimilarJobItem data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="bg-card11">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="img-failure"
        alt="failure view"
      />
      <h1>Oops! Something went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
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

  renderLoadingView = () => (
    <Oval color="#00BFFF" height={80} width={80} />

  )

  renderDetailsView = () => {
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

  render() {
    // const {imageUrl, name} = lifeAtCompany

    return (
      <div className="bg-container2">
        <Header />
        {this.renderDetailsView()}
      </div>
    )
  }
}

export default JobItemDetails

