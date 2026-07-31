import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="brand-name">DELICAKES</p>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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
  )
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
