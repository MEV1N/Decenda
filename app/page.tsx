import Image from 'next/image';
import RegistrationForm from './components/RegistrationForm';
import Countdown from './components/Countdown';

export default function Home() {
  return (
    <>
      <div className="wrapper">
        {/* ── HERO ── */}
        <section className="hero">

          {/* Decenda 26 logo — blurred until reveal */}
          <div className="dec-logo-wrap">
            <Image
              src="/img/dec logo.png"
              alt="Decenda 26"
              width={460}
              height={260}
              className="dec-logo"
              style={{ objectFit: 'contain' }}
              priority
            />
            <div className="dec-logo-overlay">
              <span className="dec-logo-title">Decenda</span>
              <span className="dec-logo-reveal">Logo Reveal Soon</span>
            </div>
          </div>

          <p className="event-subtitle">Capture The Flag</p>
          <p className="event-not-avg">Not your average CTF.</p>
          <p className="event-tagline">
            Kerala&apos;s first gamified CTF experience — where every clue is a challenge
            and every challenge is a game.
          </p>
          <span className="free-badge">✦ Free Registration ✦</span>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="#register" className="register-now-btn">Register Now</a>
          </div>

          {/* Countdown */}
          <Countdown />

          {/* Event info — date, time, location */}
          <div className="event-info-box">
            <div className="event-info-grid">
              <div className="event-info-item">
                <span className="info-label">Date</span>
                <span className="info-value">6th March 2026</span>
              </div>
              <div className="event-info-item">
                <span className="info-label">Time</span>
                <span className="info-value highlight">9:00 AM – 4:00 PM</span>
              </div>
              <div className="event-info-item">
                <span className="info-label">Prize Pool</span>
                <span className="info-value highlight">₹10,000</span>
              </div>
              <div className="event-info-item">
                <span className="info-label">Entry Fee</span>
                <span className="info-value highlight">FREE</span>
              </div>
              <div className="event-info-item wide">
                <span className="info-label">Location</span>
                <span className="info-value">Mar Baselious Christian College of Engineering and Technology, Peermade</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <div className="card">
          <h2 className="section-title">About the Event</h2>
          <p className="about-text">
            <strong>Decenda 26</strong> is <em>not your average CTF</em>. This is
            Kerala&apos;s <strong>first-of-a-kind gamified Capture The Flag</strong> — a
            darkly immersive experience where challenges are woven into a game world.
            Hunt hidden flags, crack ciphers, solve puzzles, and navigate a narrative
            that rewards the sharpest minds. Every level unlocks something deeper.
            Can you survive to the end?
          </p>
        </div>
        {/* ── CHALLENGE CATEGORIES ── */}
        <div className="card">
          <h2 className="section-title">⚔ Challenge Categories</h2>
          <div className="category-grid">
            <div className="category-item">
              <span className="category-name">Reverse Engineering</span>
            </div>
            <div className="category-item">
              <span className="category-name">Forensics</span>
            </div>
            <div className="category-item">
              <span className="category-name">Web Exploitation</span>
            </div>
            <div className="category-item">
              <span className="category-name">Cryptography</span>
            </div>
            <div className="category-item">
              <span className="category-name">Steganography</span>
            </div>
            <div className="category-item">
              <span className="category-name">Binary Exploitation</span>
            </div>
          </div>
        </div>

        {/* ── REQUIREMENTS ── */}
        <div className="card">
          <h2 className="section-title">⚙ Requirements</h2>
          <ul className="guidelines-list">
            <li>Bring your own <strong>laptop and all necessary accessories</strong> — power adapters, cables, etc.</li>
            <li>Have <strong>Kali Linux</strong> (or equivalent) installed and ready — native, VM, or live boot.</li>
            <li>Come preloaded with tools like <strong>Burp Suite</strong>, <strong>Ghidra</strong>, <strong>Wireshark</strong>, and any other tooling you rely on for CTF challenges.</li>
            <li>Ensure all tools are <strong>licensed, configured, and tested</strong> before the event day.</li>
            <li>Mobile-only participation is <strong>not permitted</strong>.</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="section-title">Guidelines</h2>
          <ul className="guidelines-list">
            <li>Participants must register individually using a valid email address.</li>
            <li>One registration per person — duplicate entries will be disqualified.</li>
            <li>Bring your own laptop. Mobile-only participation is not permitted.</li>
            <li>All tools and external resources are allowed unless explicitly prohibited by the organizers.</li>
            <li>Collaboration between teams is strictly prohibited during the event.</li>
            <li><strong>Do not attack, probe, or interfere with the college network, infrastructure, or any systems outside the designated CTF environment.</strong></li>
            <li>Attacking or disrupting the CTF platform, challenge servers, or other participants&apos; machines is strictly forbidden.</li>
            <li>Denial-of-Service (DoS) attacks against any system — including CTF infrastructure — will result in immediate disqualification.</li>
            <li>Sharing flags, solutions, or hints with other teams during the event is prohibited.</li>
            <li>Any form of brute-forcing or automated scanning against the CTF platform is not allowed unless the challenge explicitly requires it.</li>
            <li>Participants must not attempt to access, modify, or delete other teams&apos; data or submissions.</li>
            <li>All activities must remain within the scope defined by the organizers. Any out-of-scope action will lead to disqualification.</li>
            <li>Unsportsmanlike conduct, harassment, or any disruptive behaviour will result in immediate removal from the event.</li>
            <li>Decisions made by the organizers and judges are final and binding.</li>
          </ul>
        </div>

        {/* ── ORGANIZERS ── */}
        <div className="card">
          <h2 className="section-title">⬡ Organised By</h2>
          <div className="org-grid">
            {/* Row 1 */}
            <div className="org-row">
              <div className="org-item">
                <Image src="/img/th logo.png" alt="TinkerHub" width={40} height={40} style={{ objectFit: 'contain' }} />
                <div>
                  <p className="org-name">TinkerHub MBCCET</p>
                </div>
              </div>
              <div className="org-item">
                <Image src="/img/mulogo.png" alt="MuLearn" width={40} height={40} style={{ objectFit: 'contain' }} />
                <div>
                  <p className="org-name">MuLearn MBCCET</p>
                </div>
              </div>
            </div>
            {/* Row 2 — centred below */}
            <div className="org-row" style={{ justifyContent: 'center' }}>
              <div className="org-item">
                <Image src="/img/404.png" alt="Room Number 404" width={40} height={40} style={{ objectFit: 'contain' }} />
                <div>
                  <p className="org-name">Room Number 404</p>
                </div>
              </div>
              <div className="org-item">
                <Image src="/img/hive.png" alt="Hive" width={40} height={40} style={{ objectFit: 'contain' }} />
                <div>
                  <p className="org-name">Hive</p>
                  <p className="media-badge">MEDIA PARTNER</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div className="card">
          <h2 className="section-title">📞 Coordinators</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <p className="contact-role">Coordinator</p>
              <p className="contact-name">Mevin Aby Manu</p>
              <p className="contact-phone">
                <a href="tel:+919048723890">+91 90487 23890</a>
              </p>
            </div>
            <div className="contact-card">
              <p className="contact-role">Coordinator</p>
              <p className="contact-name">Anandhu Krishna</p>
              <p className="contact-phone">
                <a href="tel:+919994420724">+91 99944 20724</a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line" />
          <span className="divider-icon">⬡</span>
          <div className="divider-line" />
        </div>

        {/* ── REGISTRATION FORM ── */}
        <div id="register">
          <RegistrationForm />
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p>© 2026 Decenda 26 · MBCCET, Peermade · Organised by TinkerHub × MuLearn × Room 404</p>
      </footer>
    </>
  );
}
