import { useCallback, useEffect, useRef, useState } from 'react';
import { bootLines } from '../data/content.js';

const HOLD_MS = 1750;      // how long the handshake plays
const FAILSAFE_MS = 4000;  // hard stop, in case anything above misbehaves
const FADE_MS = 520;       // must match the CSS transition on .boot

export default function Boot() {
  const root = document.documentElement;

  // The pre-paint script in index.html adds `booting` unless the visitor has
  // reduced motion enabled. If it isn't there, render nothing at all.
  const [active, setActive] = useState(() => root.classList.contains('booting'));
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setDone(true);
    root.classList.add('revealed');
    window.setTimeout(() => {
      root.classList.remove('booting');
      setActive(false);
    }, FADE_MS);
  }, [root]);

  useEffect(() => {
    if (!active) return;

    const timer = window.setTimeout(finish, HOLD_MS);
    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    window.addEventListener('keydown', finish);
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchstart', finish, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
    };
  }, [active, finish]);

  if (!active) return null;

  return (
    <div
      className={'boot' + (done ? ' is-done' : '')}
      aria-hidden="true"
      onClick={finish}
    >
      <div className="boot__inner">
        <p className="boot__cap">Establishing session</p>
        <ol className="boot__msgs">
          {bootLines.map((line, i) => (
            <li key={line.text} style={{ '--i': i }}>
              <span className="dir">{line.dir === 'out' ? '\u25B6' : '\u25C0'}</span>
              <span>
                {line.code && <span className="code">{line.code}</span>}
                {line.code ? ' ' : ''}
                {line.text}
              </span>
            </li>
          ))}
        </ol>
        <p className="boot__done">Session established</p>
        <div className="boot__bar"><span /></div>
      </div>
      <button className="boot__skip" type="button" onClick={finish}>Skip</button>
    </div>
  );
}
