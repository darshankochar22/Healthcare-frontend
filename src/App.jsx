import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/footer.jsx'
import Login from './components/Auth/Login.jsx'
import Profile from './components/Profile/Profile.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {

  return (
    <AuthProvider>
      <div className="app-container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                  <>
                    <Navbar />
                    <Profile />
                    <Footer />
                  </>
                } />
                <Route path="/" element={
            <>
              <Navbar />
              <main className="main-content">
                <div className="hero-section">
                  <h1>🏥 Healthcare Portal</h1>
                  <p>Your trusted healthcare companion</p>
                  <div className="feature-cards">
                    <div className="feature-card">
                      <h3>🏥 Hospitals</h3>
                      <p>Find nearby hospitals and medical centers</p>
                    </div>
                    <div className="feature-card">
                      <h3>💊 Medicals</h3>
                      <p>Browse medicines and pharmacy services</p>
                    </div>
                    <div className="feature-card">
                      <h3>📝 Feedback</h3>
                      <p>Share your healthcare experience</p>
                    </div>
                  </div>
                </div>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
