import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
    // Redirect to login page if JWT token is not found
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;
