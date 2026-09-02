import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { projects } from '../data/content.js';

const ROTATE_MS = 3800;   // time each item holds the front position
const SPACING = 200;      // px between each ring slot, left/right
const DEPTH = 130;        // how far side items recede into the screen
const ANGLE = 34;         // degrees each ring slot turns away from facing you

// Shortest signed distance from `from` to `to` around a ring of length `count`.
function ringDelta(from, to, count) {
  let d = (to - from) % count;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

export default function ProjectSpinner() {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [reduced, paused, count]);

  function goTo(i) {
    setIndex(((i % count) + count) % count);
    window.clearInterval(timerRef.current);
    if (!reduced) {
      timerRef.current = window.setInterval(() => setIndex((v) => (v + 1) % count), ROTATE_MS);
    }
  }

  function onCardClick(e, delta) {
    if (delta !== 0) {
      // Not the front card yet — bring it to the front instead of navigating
      // straight from a tilted, half-visible card.
      e.preventDefault();
      goTo(index + delta);
    }
  }

  // Bound to the OUTER card element, which never itself moves on hover — see
  // note below on why the tilt lives on an inner wrapper instead.
  function onFrontPointerMove(e) {
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    setTilt({ x: py * -14, y: px * 16 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  // ---- Reduced-motion fallback: flat, static, no timer, nothing moves on
  // its own. ----
  if (reduced) {
    return (
      <section className="pnav">
        <div className="wrap"><p className="eyebrow">Jump to a project</p></div>
        <div className="pnav__track">
          <span className="pnav__pad" aria-hidden="true" />
          {projects.map((p) => (
            <a className="pnav__card" href={`#${p.id}`} key={p.id}>
              <Icon name={p.icon} />
              <span className="pnav__title">{p.title}</span>
              {p.tag && <span className="pnav__tag">{p.tag}</span>}
            </a>
          ))}
          <span className="pnav__pad" aria-hidden="true" />
        </div>
      </section>
    );
  }

  return (
    <section className="pspin">
      <div className="wrap"><p className="eyebrow">Jump to a project</p></div>

      <div
        className="pspin__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); resetTilt(); }}
      >
        <div className="pspin__ring">
          {projects.map((p, i) => {
            const delta = ringDelta(index, i, count);
            const isFront = delta === 0;
            const abs = Math.abs(delta);
            const hidden = abs > 2;

            // Ring placement only — this transform does NOT change while the
            // front card is being hovered, so its hit-box never moves and a
            // mouseleave can never be caused by the card's own tilt.
            const ringTransform =
              `translateX(${delta * SPACING}px) translateZ(${-abs * DEPTH}px) ` +
              `rotateY(${delta * -ANGLE}deg) scale(${1 - abs * 0.16})`;

            // Cursor-driven tilt lives on an inner wrapper instead, so it can
            // rotate freely without ever affecting the outer element's shape.
            const tiltTransform = isFront
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(22px)`
              : '';

            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={'pspin__item' + (isFront ? ' is-front' : '')}
                style={{
                  transform: ringTransform,
                  opacity: hidden ? 0 : 1 - abs * 0.32,
                  zIndex: 10 - abs,
                  pointerEvents: hidden ? 'none' : 'auto',
                }}
                onClick={(e) => onCardClick(e, delta)}
                onMouseMove={isFront ? onFrontPointerMove : undefined}
                onMouseLeave={isFront ? resetTilt : undefined}
                tabIndex={hidden ? -1 : 0}
              >
                <span className="pspin__tilt" style={{ transform: tiltTransform }}>
                  <Icon name={p.icon} />
                  <span className="pspin__title">{p.title}</span>
                  {p.tag && <span className="pspin__tag">{p.tag}</span>}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="pspin__dots">
        {projects.map((p, i) => (
          <button
            key={p.id}
            className={'pspin__dot' + (i === index ? ' is-active' : '')}
            aria-label={`Show ${p.title}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
