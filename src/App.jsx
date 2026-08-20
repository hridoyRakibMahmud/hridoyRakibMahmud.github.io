import Boot from './components/Boot.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import StrengthIcon from './components/StrengthIcon.jsx';
import ContactForm from './components/ContactForm.jsx';
import CaseStudy from './components/CaseStudy.jsx';
import useReveal from './components/useReveal.js';
import { profile, strengths, projects, toolkit } from './data/content.js';

export default function App() {
  useReveal('.card, .case, .kit > div, .contact .wrap > *');

  return (
    <>
      <Boot />
      <ThemeToggle />

      <header className="hero">
        <div className="wrap hero__inner">
          <div>
            <p className="eyebrow">{profile.eyebrow}</p>
            <h1>{profile.name}</h1>
            <p className="lede">
              Five years building Android and Flutter apps that have to stay connected —{' '}
              <strong>SIP telephony, self-hosted video conferencing, and clinical device data</strong>.
              {' '}The kind of work where a dropped socket is a bug report.
            </p>
            <p className="status"><span className="dot" />{profile.status}</p>
            <div className="actions">
              <a className="btn btn--go" href="#work">See the work</a>
              <a className="btn" href={profile.resume} download>Download résumé</a>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <p className="eyebrow">What I&rsquo;m strongest at</p>
          <div className="strengths">
            {strengths.map((s) => (
              <div className="card" key={s.title}>
                <StrengthIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section id="work">
        <div className="wrap">
          <p className="eyebrow">Selected work</p>
          <h2>Five years, mostly on things that ring, stream or sync.</h2>
          {projects.map((p) => (
            <CaseStudy project={p} key={p.title} />
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section>
        <div className="wrap">
          <p className="eyebrow">Toolkit</p>
          <dl className="kit">
            {toolkit.map((k) => (
              <div key={k.label}>
                <dt>{k.label}</dt>
                <dd>
                  <ul className="chips">
                    {k.body.split(', ').map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <hr className="rule" />

      <section className="contact" id="contact">
        <div className="wrap">
          <p className="eyebrow">Get in touch</p>
          <h2>Available now, and happy to talk through any of the above.</h2>
          <p className="lede">
            I&rsquo;m looking for mobile engineering roles — native Android, Flutter, or
            cross-platform — on-site in Dhaka, remote, or with relocation. If something here overlaps with what your team is
            building, send me a message and I&rsquo;ll get back to you.
          </p>
          <ContactForm />

          <div className="contact-links">
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            {profile.github && (
              <a className="btn" href={profile.github} target="_blank" rel="noopener">GitHub</a>
            )}
            <a className="btn" href={profile.resume} download>Résumé (PDF)</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">Md. Rakib Mahmud Hridoy · Dhaka, Bangladesh</div>
      </footer>
    </>
  );
}
