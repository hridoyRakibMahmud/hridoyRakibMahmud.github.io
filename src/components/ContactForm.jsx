import { useState } from 'react';
import { profile, contact } from '../data/content.js';

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // Not configured yet — show the address instead of a form that silently fails.
  if (!contact.accessKey) {
    return (
      <p className="form__note">
        Email me at{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.target;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot: real people leave this empty. Pretend success so bots don't retry.
    if (data.botcheck) {
      setStatus('sent');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.accessKey,
          subject: `Portfolio message from ${data.name}`,
          from_name: 'Portfolio',
          name: data.name,
          email: data.email,
          replyto: data.email,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Rejected');

      setStatus('sent');
      form.reset();
    } catch (err) {
      console.error('Contact form failed:', err);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form__done" role="status">
        <p className="form__done-title">Message sent.</p>
        <p className="form__note">
          I&rsquo;ll reply from {profile.email}, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows="5" required
                  placeholder="What are you building, and what are you looking for?" />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <input type="checkbox" name="botcheck" className="form__hp" tabIndex="-1" autoComplete="off" />

      <div className="form__actions">
        <button className="btn btn--go" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="form__note" aria-live="polite">
          {status === 'error' ? (
            <>
              That didn&rsquo;t send — email me directly at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </>
          ) : (
            <>
              Or email{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
