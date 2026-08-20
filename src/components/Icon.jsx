// One small animated scene per project, drawn by hand. Each one shows the thing
// the project actually does — a call routed around a globe, vitals being traced,
// extension state changing on a PBX — rather than a generic category symbol.
//
// All motion is CSS (see styles.css). Nothing loads at runtime, nothing depends
// on a library, and every animation is switched off under prefers-reduced-motion,
// leaving a legible static drawing.

const scenes = {
  // Clock with a sweeping hand — attendance and time tracking.
  attendance: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M24 16v8" className="ic-hand" />
      <path d="M24 24l6 4" className="ic-hand-min" />
      <path className="ic-tick" d="M18 24.5l4 4 8-9" />
    </>
  ),

  // Aircraft with live extension state changing beneath it — the AMI event stream.
  aircraft: (
    <>
      <path d="M24 5c1.6 0 2.6 2 2.6 4.6v5.3l12 7v3l-12-3.4v6l3.9 2.9v1.9L24 31.4l-6.5 1.9v-1.9l3.9-2.9v-6l-12 3.4v-3l12-7V9.6C21.4 7 22.4 5 24 5Z" />
      <circle className="ic-ext ic-ext-1" cx="15" cy="42" r="2.4" />
      <circle className="ic-ext ic-ext-2" cx="24" cy="42" r="2.4" />
      <circle className="ic-ext ic-ext-3" cx="33" cy="42" r="2.4" />
    </>
  ),

  // Handset with signal arcs rippling out — SIP registration and ringing.
  voip: (
    <>
      <path d="M11 9h6l3 7-4 2.5a20 20 0 0 0 10 10L29 25l7 3v6a3 3 0 0 1-3 3A25 25 0 0 1 8 12a3 3 0 0 1 3-3Z" />
      <path className="ic-wave ic-wave-1" d="M27 14a7 7 0 0 1 6 6" />
      <path className="ic-wave ic-wave-2" d="M28 7a14 14 0 0 1 12 12" />
      <path className="ic-wave ic-wave-3" d="M29 1a21 21 0 0 1 18 18" />
    </>
  ),

  // A call travelling around the world — the virtual second number.
  globe: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M9 24h30" />
      <path d="M24 9c4 4.4 6 9.4 6 15s-2 10.6-6 15c-4-4.4-6-9.4-6-15s2-10.6 6-15Z" />
      <path className="ic-route" d="M11 31a26 26 0 0 1 26-14" pathLength="100" />
      <circle className="ic-hop" cx="0" cy="0" r="2.6" />
    </>
  ),

  // Participants joining a session, with the recording indicator live.
  conferencing: (
    <>
      <rect x="5" y="12" width="28" height="20" rx="3" />
      <path d="M33 20l9-5v18l-9-5" />
      <circle className="ic-seat ic-seat-1" cx="13" cy="22" r="2.6" />
      <circle className="ic-seat ic-seat-2" cx="19" cy="22" r="2.6" />
      <circle className="ic-seat ic-seat-3" cx="25" cy="22" r="2.6" />
      <circle className="ic-rec" cx="10" cy="37" r="2.2" />
      <path d="M15 37h14" />
    </>
  ),

  // A vitals trace being written across the monitor.
  vitals: (
    <>
      <rect x="4" y="10" width="40" height="28" rx="4" />
      <path className="ic-trace" pathLength="100"
            d="M9 25h5.5l2.5-7 4 15 3.5-8H31l2 4 2-4h5" />
    </>
  ),
};

export default function Icon({ name }) {
  const scene = scenes[name];
  if (!scene) return null;

  return (
    <span className="case__icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {scene}
      </svg>
    </span>
  );
}
