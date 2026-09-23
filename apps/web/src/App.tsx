import './App.css'

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
)

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Thornvine home">
          <span className="brand-mark" aria-hidden="true">
            T
          </span>
          <span>Thornvine</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#story">Our story</a>
        </nav>

        <a className="header-cta" href="#early-access">
          Get early access
          <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" id="product">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              A new product, taking root
            </p>
            <h1>
              Built to grow
              <br />
              <em>with you.</em>
            </h1>
            <p className="hero-intro">
              Thornvine is creating a more thoughtful way to turn early ideas
              into lasting momentum.
            </p>
            <div className="hero-actions" id="early-access">
              <a className="button button--primary" href="mailto:hello@thornvine.com">
                Join the waitlist
                <ArrowIcon />
              </a>
              <a className="button button--quiet" href="#story">
                Discover Thornvine
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="sun" />
            <svg className="vine" viewBox="0 0 560 620" fill="none">
              <path
                className="vine-stem"
                d="M286 655C271 554 319 497 278 419C245 356 260 310 312 254C360 202 370 135 347 50"
              />
              <path
                className="vine-branch"
                d="M286 450C228 436 180 397 158 345M291 324C351 318 403 278 431 228M304 267C260 245 229 209 218 167"
              />
              <path
                className="leaf leaf--one"
                d="M160 346C101 348 73 311 72 263C126 262 160 292 160 346Z"
              />
              <path
                className="leaf leaf--two"
                d="M430 228C487 223 518 184 515 137C462 140 430 174 430 228Z"
              />
              <path
                className="leaf leaf--three"
                d="M218 168C174 157 157 122 166 87C207 98 228 126 218 168Z"
              />
            </svg>
            <p className="art-note">Quietly growing since 2026</p>
          </div>
        </section>

        <section className="story-strip" id="story" aria-label="Our approach">
          <p>Rooted in clarity.</p>
          <span aria-hidden="true">✦</span>
          <p>Designed for momentum.</p>
          <span aria-hidden="true">✦</span>
          <p>Made to last.</p>
        </section>
      </main>
    </div>
  )
}

export default App
