import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

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
  return <h1>Home</h1>
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
