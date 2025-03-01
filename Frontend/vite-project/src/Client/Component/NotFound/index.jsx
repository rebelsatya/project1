import './index.css'

const NotFound = () => (
  <div className="bg-card-notfound">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="img-notfound"
      alt="not found"
    />
    <h1 className="heading-notfound ">Page Not Found</h1>
    <p className="para-notfound">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
