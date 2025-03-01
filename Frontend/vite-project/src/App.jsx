
import Login from './Client/Component/Login'

import { Routes, Route,  BrowserRouter,Navigate  } from 'react-router-dom'
import Home from './Client/Component/Home'
import Jobs from './Client/Component/Jobs'
import JobItemDetails from './Client/Component/JobItemDetails'
import ProtectedRoute from './Client/Component/ProtectedRoute'
import NotFound from './Client/Component/NotFound'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
 
   <Routes>
   <Route path="/login" element={<Login />} />


<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
<Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
<Route path="/jobs/:id" element={<JobItemDetails />} />


<Route path="/not-found" element={<NotFound />} />


<Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App


{/* <>
<div>
  <a href="https://vite.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p>
</> */}