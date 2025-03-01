import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobdata} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobdata
  return (
    <Link to={`/jobs/${id}`} className="link-job link-item">
      <li className="bg-card-JobCard12">
        <div className="bg-jobcard1 link-job">
          <img
            src={companyLogoUrl}
            className="img-company-logo"
            alt="company logo"
          />
          <div className="bg-jobcard3">
            <h1 className="heading-job">{title}</h1>
            <div className="bg-jobcard1">
              <AiFillStar className="star-icon link-job" size="25px" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="bg-jobcard2">
          <div className="bg-jobcard1">
            <div className="bg-jobcard1">
              <HiLocationMarker size="25px" className="spacing link-job" />
              <p className="para1">{location}</p>
            </div>
            <div className="bg-jobcard1">
              <HiMail size="25px" className="spacing" />
              <p>{employmentType}</p>
            </div>
          </div>
          <h1 className="heading-jobcard">{packagePerAnnum}</h1>
        </div>
        <hr className="horizontal-line2" />
        <h1 className="heading-jobcard">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
