import {Component} from 'react'
import Header from '../Header'
import JobProfileSection from '../JobProfileSection'
import './index.css'

class Jobs extends Component {
  state = {data: []}

  render() {
    return (
      <div>
        <Header />
        <>
          <JobProfileSection />
        </>
      </div>
    )
  }
}

export default Jobs
