import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useUser } from './useUser'

const cakeImages = [
    { src: '/cakes/1.jpeg', alt: 'Decorated chocolate cake' },
    { src: '/cakes/2.jpeg', alt: 'Celebration cake with frosting' },
    { src: '/cakes/3.jpeg', alt: 'Layered cake with fruit' },
    { src: '/cakes/4.jpeg', alt: 'Homemade cake with cream decoration' },
    { src: '/cakes/5.jpeg', alt: 'Decorated dessert cake' },
    { src: '/cakes/6.jpeg', alt: 'Custom cake with colorful decoration' }
]

 type Recipe = {
    id: number
    title: string
    category: string
    description: string
    image: string
  }

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
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Register
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        fetch('http://localhost:3100/recipes')
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Unable to load recipes.')
                }
                return response.json();
            })
            .then((data: Recipe[]) => {
                setRecipes(data);
                setIsLoading(false);
            })
            .catch(() => {
                setError('Unable to load recipes.');
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

  return (
    <section className='recipes-section'>
        <h1>Recipes</h1>

        <div className = 'recipe-grid'>
            {recipes.map(recipe => (
                <article className='recipe-card' key={recipe.id}>
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
    const {user} = useUser();
  return (
    <section className='about-section'>
        <h1>About DELICAKES</h1>
        <p>DELICAKES creates handmade cakes for special moments</p>
        <p>We focus on thoughtful designs, quality ingredients and delicious results</p>
        <p>{user ? `Signed in as ${user.name}` : 'No user is currently signed in.'}</p>
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
  const { setUser } = useUser();
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
        if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFeedback('Please enter a valid email address.');
            return;
        }
        setUser({ name: email.split('@')[0], email });
        setFeedback(`Logged in as ${email}`);
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
        <p>Need an account? <NavLink to="/register">Register here</NavLink></p>
        {feedback && <p>{feedback}</p>}
    </form>
  )
}

function ProfilePage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

    if (!user) {
        return (
            <section className="profile-section">
                <h1>Profile</h1>
                <p>No user is currently logged in.</p>
                <NavLink to="/login">Go to Login</NavLink>
            </section>
        );
    }

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <section className="profile-section">
            <h1>Profile</h1>
            <p>Logged in as {user.email}</p>
            <button type="button" onClick={handleLogout}>
                Log Out
            </button>
        </section>
    );
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <form
      className="register-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
          setFeedback("Please complete all fields.");
          return;
        }

        if (password !== confirmPassword) {
          setFeedback("Passwords do not match.");
          return;
        }
        setFeedback("Registration details submitted successfully!");
      }}
    >
      <h1>Register</h1>

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </label>

      <button type="submit">Register</button>

      {feedback && <p>{feedback}</p>}
    </form>
  );
}

export default App