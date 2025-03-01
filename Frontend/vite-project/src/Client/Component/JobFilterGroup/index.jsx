import ProfileDetails from '../ProfileDetails'
import './index.css'

const JobFilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    inputRadioChange,
    inputcheckboxChange,
  } = props

  const inputRadioData = event => {
    inputRadioChange(event.target.value)
  }

  const inputcheckboxData = event => {
    inputcheckboxChange(event.target.value)
  }

  const renderEmploymentDetails = () => (
    <div className="bg-container10">
      <hr className="horizontal-line" />
      <h1 className="heading-card">Type of Employment</h1>
      <ul className="list">
        {employmentTypesList.map(s => (
          <li
            className="list-type"
            onChange={inputcheckboxData}
            key={s.employmentTypeId}
          >
            <input
              type="checkbox"
              className="input"
              id={s.employmentTypeId}
              value={s.employmentTypeId}
            />
            <label htmlFor={s.employmentTypeId}>{s.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div>
      <hr className="horizontal-line" />
      <h1 className="heading-card">Salary Range</h1>
      <ul className="list">
        {salaryRangesList.map(s => (
          <li
            className="list-type"
            onChange={inputRadioData}
            key={s.salaryRangeId}
          >
            <input
              type="radio"
              className="input"
              id={s.salaryRangeId}
              name="data"
              value={s.salaryRangeId}
            />
            <label htmlFor={s.salaryRangeId}>{s.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="bg-container-group">
      <ProfileDetails />
      {renderEmploymentDetails()}
      {renderSalaryRange()}
    </div>
  )
}

export default JobFilterGroup
