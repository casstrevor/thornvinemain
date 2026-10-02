import { Link } from 'react-router-dom'
import './App.css'
import { publicUrl } from './lib/publicUrl'

const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
)

const ArrowOut = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
    <path d="M5 15L15 5M8 5h7v7" />
  </svg>
)

const LogoMark = () => (
  <svg aria-hidden="true" className="brand-mark" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 28C16 28 7 20.5 6 12.5C5.2 6.2 10.5 3 16 2.2C21.5 3 26.8 6.2 26 12.5C25 20.5 16 28 16 28Z"
      fill="currentColor"
    />
    <path
      d="M16 26V6M16 14C12.5 12 10 9 9 6M16 18C19.5 16 22 13 23 9"
      stroke="#f3efe6"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const IconLeaves = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="service-icon">
    <path d="M18 38C18 38 10 30 9 22C8 15 13 11 18 10C23 11 28 15 27 22C26 30 18 38 18 38Z" />
    <path d="M30 36C30 36 24 29 23 22C22 16 26 12 30 11C34 12 38 16 37 22C36 29 30 36 30 36Z" />
    <path d="M18 36V16M30 34V17" strokeWidth="1.4" />
  </svg>
)

const IconCompass = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="service-icon">
    <circle cx="24" cy="24" r="14" />
    <path d="M24 10v4M24 34v4M10 24h4M34 24h4" strokeWidth="1.5" />
    <path d="M20 28l4-12 4 12-4-3-4 3Z" fill="currentColor" stroke="none" />
  </svg>
)

const IconNetwork = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="service-icon">
    <path d="M24 40V18M24 24l-10-8M24 28l10-6M24 18l-8-8M24 18l8-8" strokeWidth="1.6" />
    <circle cx="24" cy="16" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="16" r="2" fill="currentColor" stroke="none" />
    <circle cx="34" cy="22" r="2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none" />
    <circle cx="32" cy="10" r="2" fill="currentColor" stroke="none" />
  </svg>
)

const IconBook = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="service-icon">
    <path d="M10 12h12c2 0 4 1.5 4 4v20c0-2-2-3.5-4-3.5H10V12Z" />
    <path d="M38 12H26c-2 0-4 1.5-4 4v20c0-2 2-3.5 4-3.5h12V12Z" />
    <path d="M24 18c0-3 2-6 2-6s2 3 2 6-2 4-2 4-2-1-2-4Z" fill="currentColor" stroke="none" />
  </svg>
)

const services = [
  {
    title: 'Digital products',
    description: 'Apps, portals & tools',
    Icon: IconLeaves,
  },
  {
    title: 'Design & strategy',
    description: 'Clear ideas. Thoughtful experiences.',
    Icon: IconCompass,
  },
  {
    title: 'AI & automation',
    description: 'Smarter ways to work',
    Icon: IconNetwork,
  },
  {
    title: 'Learning & creative',
    description: 'Content that connects',
    Icon: IconBook,
  },
] as const

function App() {
  return (
    <div className="site">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Thornvine home">
          <LogoMark />
          <span>thornvine</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <a href="#what-we-do">What we do</a>
          <a href="#work">Our work</a>
          <a href="#people">Our people</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-media" aria-hidden="true">
            <img
              className="hero-bg"
              src={publicUrl('images/hero-composed.jpg')}
              alt=""
              fetchPriority="high"
            />
            <div className="hero-wash" />
            <img className="float-leaf float-leaf--1" src={publicUrl('images/leaf.svg')} alt="" />
            <img className="float-leaf float-leaf--2" src={publicUrl('images/leaf-gold.svg')} alt="" />
            <img className="float-leaf float-leaf--3" src={publicUrl('images/leaf.svg')} alt="" />
            <img className="float-leaf float-leaf--4" src={publicUrl('images/leaf-gold.svg')} alt="" />
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Human ideas. Digital possibilities.</p>
            <h1 id="hero-heading">
              Your imagination.
              <br />
              Let&apos;s make it real.
            </h1>
            <p className="hero-lede">
              We design and build custom apps, digital tools, and experiences
              for people with ideas.
            </p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="#contact">
                Tell us your idea
                <ArrowRight />
              </a>
              <a className="text-link" href="#work">
                Explore our work
                <ArrowOut />
              </a>
            </div>
            <p className="hero-note">Free consultation. Real collaboration.</p>
          </div>
        </section>

        <p className="experience-bar">
          30+ years of combined experience in design, technology &amp; learning
        </p>

        <section className="services" id="what-we-do" aria-labelledby="services-heading">
          <h2 id="services-heading">What can we create together?</h2>
          <ul className="services-grid">
            {services.map(({ title, description, Icon }) => (
              <li key={title} className="service-card">
                <Icon />
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="work" id="work" aria-labelledby="work-heading">
          <div className="work-head">
            <h2 id="work-heading">Ideas taking shape.</h2>
            <a className="text-link text-link--light" href="#work">
              Explore our work
              <ArrowOut />
            </a>
          </div>

          <div className="work-grid">
            <article className="project-card">
              <div className="project-visual project-visual--ovrmaps">
                <img src={publicUrl('images/ovrmaps-bg.jpg')} alt="" />
                <div className="phone-mock" aria-hidden="true">
                  <div className="phone-screen">
                    <svg className="map-art" viewBox="0 0 160 280" preserveAspectRatio="none">
                      <rect width="160" height="280" fill="#d8e2d0" />
                      <path
                        d="M0 90C30 70 50 110 80 95C110 80 130 50 160 60V280H0V90Z"
                        fill="#b7c9a8"
                      />
                      <path
                        d="M0 160C40 140 70 180 100 165C130 150 145 175 160 170V280H0V160Z"
                        fill="#9fb48d"
                      />
                      <path
                        d="M28 240C40 200 55 170 78 140C98 115 118 90 132 55"
                        fill="none"
                        stroke="#c45c4a"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="78" cy="140" r="5" fill="#c45c4a" />
                    </svg>
                    <div className="trail-chip">
                      <strong>Pine Ridge Trail</strong>
                      <span>6.8 km · 432 m</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-meta">
                <div>
                  <h3>OVRmaps</h3>
                  <p>Apps, maps and tools for a wilder tomorrow.</p>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
              </div>
            </article>

            <article className="project-card">
              <div className="project-visual project-visual--wyldtracks">
                <img src={publicUrl('images/wyldtracks-bg.jpg')} alt="" />
                <div className="wyld-overlay" aria-hidden="true">
                  <svg viewBox="0 0 400 300" className="wyld-mark">
                    <circle cx="200" cy="118" r="28" fill="#e8c96a" opacity="0.9" />
                    <path
                      d="M40 220C90 160 140 140 200 160C260 180 310 150 360 190"
                      fill="none"
                      stroke="rgba(243,239,230,0.55)"
                      strokeWidth="2"
                    />
                    <path
                      d="M70 250C120 190 160 170 200 190C250 215 300 180 350 230"
                      fill="none"
                      stroke="rgba(243,239,230,0.35)"
                      strokeWidth="2"
                    />
                    <path
                      d="M30 40C80 70 70 130 40 160M370 50C320 80 330 140 360 170"
                      fill="none"
                      stroke="rgba(243,239,230,0.45)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="preview-label">Project preview coming soon</span>
                </div>
              </div>
              <div className="project-meta">
                <div>
                  <h3>Wyldtracks</h3>
                  <p>A new kind of outdoor experience is on the way.</p>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
              </div>
            </article>
          </div>
        </section>

        <section className="closing" id="contact" aria-labelledby="closing-heading">
          <div className="closing-frame" aria-hidden="true">
            <img src={publicUrl('images/footer-frame.jpg')} alt="" />
          </div>
          <div className="closing-copy">
            <h2 id="closing-heading">Good things grow together.</h2>
            <p>Curious minds. Thoughtful makers. Humans who care.</p>
            <a className="btn btn--primary" href="mailto:hello@thornvine.com">
              Tell us your idea
              <ArrowRight />
            </a>
          </div>
          <div className="closing-bar">
            <p className="copyright">
              © {new Date().getFullYear()} Thornvine. All rights reserved.
            </p>
            <Link className="portal-link" to="/clientportal">
              Client portal
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div id="people" hidden />
        </section>
      </main>
    </div>
  )
}

export default App
