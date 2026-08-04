import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const cakeImages = [
    { src: '/cakes/1.jpeg', alt: 'Decorated chocolate cake' },
    { src: '/cakes/2.jpeg', alt: 'Celebration cake with frosting' },
    { src: '/cakes/3.jpeg', alt: 'Layered cake with fruit' },
    { src: '/cakes/4.jpeg', alt: 'Homemade cake with cream decoration' },
    { src: '/cakes/5.jpeg', alt: 'Decorated dessert cake' },
    { src: '/cakes/6.jpeg', alt: 'Custom cake with colorful decoration' }
]

function App() {

  return (
    <main className="app-shell">
      <header className="site-header">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `brand-name${isActive ? ' active' : ''}`}
        >
          DELICAKES
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink
            to="/recipes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

function HomePage() {

const [currentImageIndex, setCurrentImageIndex] = useState(0);
const showPreviousImage = () => {
    setCurrentImageIndex((currentIndex) => currentIndex ===0 ? cakeImages.length - 1 : currentIndex - 1);
}
const showNextImage = () => {
    setCurrentImageIndex((currentIndex) => currentIndex === cakeImages.length - 1 ? 0 : currentIndex + 1);
}
  return (
    <section className='gallery-section'>
        <h1>Our Cakes</h1>
        <div className='cake-carousel'>
            <button type='button' onClick={showPreviousImage}>
                Previous
            </button>
            <img src={cakeImages[currentImageIndex].src}
                      alt={cakeImages[currentImageIndex].alt} />
            <button type='button' onClick={showNextImage}>
                Next
            </button>
        </div>
    </section>
  )
}

function RecipesPage() {
  return <h1>Recipes</h1>
}

function AboutPage() {
  return <h1>About</h1>
}

function ContactPage() {
  return <h1>Contact</h1>
}

function LoginPage() {
  return <h1>Login</h1>
}

export default App
