import { useEffect, useState } from 'react'
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

 const recipes = [
   {
     title: "Chocolate Celebration Cake",
     category: "Cakes",
     description:
       "A rich chocolate cake finished with smooth chocolate frosting.",
     image: "/cakes/1.jpeg",
   },
   {
     title: "Fresh Fruit Cake",
     category: "Cakes",
     description: "A light layered cake decorated with fresh seasonal fruit.",
     image: "/cakes/3.jpeg",
   },
   {
     title: "Classic Cream Cake",
     category: "Cakes",
     description: "A soft sponge cake covered with delicate cream decoration.",
     image: "/cakes/4.jpeg",
   },
 ];

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

useEffect(() => {
    const timerId = window.setInterval(() => {
        setCurrentImageIndex((currentIndex) =>
            currentIndex === cakeImages.length - 1 ? 0 : currentIndex + 1
        );
    }, 5000);
    return () => {
        window.clearInterval(timerId);
    };
}, []);

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
  return (
    <section className='recipes-section'>
        <h1>Recipes</h1>

        <div className = 'recipes-grid'>
            {recipes.map(recipe => (
                <article className='recipe-card' key={recipe.title}>
                    <img src={recipe.image} alt={recipe.title} />
                    <h2>{recipe.title}</h2>
                    <p className='recipe-category'>{recipe.category}</p>
                    <p>{recipe.description}</p>
                </article>
                ))}
        </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className='about-section'>
        <h1>About DELICAKES</h1>
        <p>DELICAKES creates handmade cakes for special moments</p>
        <p>We focus on thoughtful designs, quality ingredients and delicious results</p>
    </section>
  );

}

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
  return (
    <>
    <form
        className="contact-form"
        onSubmit={(e) => {
            e.preventDefault();
            if (name && email && message) {
                setSubmitted(true);
            }
        }}
    >
        <h1>Contact</h1>
        <label>
            Name
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </label>
        <label>
            Email
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </label>
        <label>
            Message
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
        </label>
        <button type="submit">Send</button>
        {submitted && <p>Thank you for your message!</p>}
    </form>
    </>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[feedback, setFeedback] = useState('');
  return (
    <form
    className="login-form"
    noValidate
    onSubmit={(e) => {
        e.preventDefault();
        if(!email || !password) {
            setFeedback('Please enter both your email and password.');
            return;
        }
        setFeedback('Login details submitted successfully!');
        }
    }
    >
        <h1>Login</h1>
        <label>
            Email
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </label>
        <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </label>
        <button type="submit">Log In</button>
        {feedback && <p>{feedback}</p>}
    </form>
  )
}

export default App