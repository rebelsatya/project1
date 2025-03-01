import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    rating,
    location,
    title,
  } = data
  return (
    <li className="bg-card-container12">
      <div className="bg-similarcard2 bg-card13">
        <img
          src={companyLogoUrl}
          className="img-company-logo1"
          alt="similar job company logo"
        />
        <div className="bg-similarcard3">
          <h1 className="heading-similarItem">{title}</h1>
          <div className="bg-jobcard1">
            <AiFillStar className="star-icon" size="25px" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className='heading-description'>Description</h1>
      <p className="para-similar-job">{jobDescription}</p>
      <div className="bg-jobcard1 bg-card13">
        <div className="bg-jobcard1 ">
          <HiLocationMarker size="25px" className="spacing" />
          <p className="para1">{location}</p>
        </div>
        <div className="bg-jobcard1">
          <HiMail size="25px" className="spacing" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
