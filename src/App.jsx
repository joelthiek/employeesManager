import "./App.css"
import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/signin/SignIn"
import SignUpPage from "./pages/signup/SignUpPage"
import Landing from "./pages/landing/Landing"
import Dashboard from "./pages/dashboard/Dashboard"
import Navbar from "./components/navbar/Navbar"
import ProtectedRoute from "./utils/firebase/protectedRoute/ProtectedRoute"

import { useLocation } from "react-router-dom"
import NotFoundPage from "./pages/notfoundPage/NotFoundPage"
import Analytic from "./pages/analytics/Analytic"

function App() {
  const location = useLocation()
  const noNavbarPage = ["/auth", "/signup"]

  return (
    <>
      {!noNavbarPage.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<SignIn />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/analytic" element = {<Analytic/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
