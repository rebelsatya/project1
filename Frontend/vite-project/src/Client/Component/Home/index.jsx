import Cookies from 'js-cookie'
import { Navigate, Link } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header />

      <div className="bg-card5">
        <div className="bg-card6">
          <h1 className="heading2">Find The Job That Fits Your Life</h1>
          <p className="para">Millions of people are searching for jobs</p>
          <Link to="/jobs">
            <button type="button" className="btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
