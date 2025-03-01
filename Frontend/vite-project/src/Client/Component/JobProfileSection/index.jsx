import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import { Oval } from 'react-loader-spinner';


import Cookies from 'js-cookie'
import JobFilterGroup from '../JobFilterGroup'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  responseInitial: 'initail',
  responseSuccess: 'success',
  responseFailure: 'failure',
  responseInProgress: 'INPROGRESS',
}

class JobProfileSection extends Component {
  state = {
    jobList: [],
    searchInput: '',
    employeeType: [],
    salary: 0,
    apiStatusResponse: apiStatus.responseInitial,
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const {searchInput, employeeType, salary} = this.state
    this.setState({
      apiStatusResponse: apiStatus.responseInProgress,
    })

    const jwtToken = Cookies.get('User_access')
    const Apiurl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(Apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      const UpdatedList = data.jobs.map(p => ({
        companyLogoUrl: p.company_logo_url,
        employmentType: p.employment_type,
        id: p.id,
        jobDescription: p.job_description,
        location: p.location,
        packagePerAnnum: p.package_per_annum,
        rating: p.rating,
        title: p.title,
      }))
      this.setState({
        jobList: UpdatedList,
        apiStatusResponse: apiStatus.responseSuccess,
      })
    } else {
      this.setState({
        apiStatusResponse: apiStatus.responseFailure,
      })
    }
  }

  renderdataList = () => {
    const {apiStatusResponse} = this.state

    switch (apiStatusResponse) {
      case apiStatus.responseSuccess:
        return this.renderSuccessView()
      case apiStatus.responseFailure:
        return this.renderFailureView()
      case apiStatus.responseInProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {jobList} = this.state
    const jobsDisplay = jobList.length > 0
    return jobsDisplay ? (
      <ul className="list-type-job">
        {jobList.map(g => (
          <JobCard jobdata={g} key={g.id} />
        ))}
      </ul>
    ) : (
      <div className="bg-card11">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="img-failure"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters
        </p>
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
    <div className="profile-loader-container" data-testid="loader">
      <Oval type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  searchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  inputRadioChange = data => {
    this.setState({salary: data}, this.getProfileDetails)
  }

  inputcheckboxChange = data => {
    console.log(data)
    this.setState(
      prevState => ({employeeType: [...prevState.employeeType, data]}),
      this.getProfileDetails,
    )
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getProfileDetails()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="bg-container1">
        <JobFilterGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          inputRadioChange={this.inputRadioChange}
          inputcheckboxChange={this.inputcheckboxChange}
        />
        <div>
          <div className="cardinput">
            <input
              type="search"
              className="input-search"
              onChange={this.searchInputChange}
              onKeyDown={this.onKeyDown}
              value={searchInput}
              placeholder="Search"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="btn1"
              onClick={this.getProfileDetails}
            >
              <BsSearch className="search-icon" size="18px" />
            </button>
          </div>
          <div>{this.renderdataList()}</div>
        </div>
      </div>
    )
  }
}

export default JobProfileSection
