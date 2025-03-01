import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  
  const navigate = useNavigate()

  const buttonLogOut = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="bg-card3">
      <Link to="/" className="link-job">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="bg-card4">
        <Link to="/" className="link-job">
          <li className="heading1">Home</li>
        </Link>

        <Link to="/jobs" className="link-job">
          <li className="heading1">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="btn" onClick={buttonLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default Header
