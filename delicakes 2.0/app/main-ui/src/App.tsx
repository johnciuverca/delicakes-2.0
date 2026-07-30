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

            <section className="hero-section" id="home">
                <p className="eyebrow">Fresh cakes, made simple</p>
                <h1>Build the new DELICAKES experience.</h1>
                <p className="hero-copy">
                    This frontend will grow into the main home for recipes, profiles, orders, and customer pages.
                </p>
            </section>
        </main>
    )
}

export default App
