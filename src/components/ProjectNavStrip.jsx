import { useRef } from 'react';
import Icon from './Icon.jsx';
import { projects } from '../data/content.js';

// A horizontal strip of small cards, one per case study below. Click (or tap)
// jumps straight to that project via the anchor id CaseStudy sets on each
// <article>. Desktop mouse users can also drag the strip sideways — a plain
// scrollbar reads oddly on a row this short, and trackpads/phones already
// scroll it natively without any of this.
export default function ProjectNavStrip() {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startScroll: 0 });

  function onPointerDown(e) {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startScroll: track.scrollLeft };
    track.classList.add('is-grabbing');
  }

  function onPointerMove(e) {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.down || !track) return;
    const delta = e.clientX - d.startX;
    if (Math.abs(delta) > 5) d.moved = true;
    if (d.moved) track.scrollLeft = d.startScroll - delta;
  }

  function endDrag() {
    const track = trackRef.current;
    if (track) track.classList.remove('is-grabbing');
    drag.current.down = false;
  }

  // If the pointer actually dragged, swallow the click that would otherwise
  // fire on release so a drag doesn't also navigate.
  function onClickCapture(e) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <section className="pnav">
      <div className="wrap">
        <p className="eyebrow">Jump to a project</p>
      </div>
      <div
        className="pnav__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
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
