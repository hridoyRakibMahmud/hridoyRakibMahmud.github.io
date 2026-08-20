// Small animated marks for the three "strongest at" cards. Same rules as the
// project icons: hand-drawn, CSS-animated, and reduced to a legible still under
// prefers-reduced-motion.

const scenes = {
  // Modules stacking into a build — multi-module Android.
  modules: (
    <>
      <rect className="sc-mod sc-mod-1" x="6" y="24" width="28" height="6" rx="2" />
      <rect className="sc-mod sc-mod-2" x="6" y="15" width="28" height="6" rx="2" />
      <rect className="sc-mod sc-mod-3" x="6" y="6" width="28" height="6" rx="2" />
    </>
  ),

  // One source, two targets — the cross-platform idea.
  crossplatform: (
    <>
      <rect x="3" y="7" width="15" height="24" rx="2.5" />
      <rect x="22" y="12" width="15" height="19" rx="2.5" />
      <circle className="sc-emit" cx="10.5" cy="19" r="2.4" />
      <path className="sc-link" d="M18 19h4" />
      <circle className="sc-recv" cx="29.5" cy="21.5" r="2.4" />
    </>
  ),

  // A packet crossing between two endpoints, and coming back.
  realtime: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="34" cy="19" r="3" />
      <path d="M9 19h22" strokeDasharray="3 4" opacity="0.5" />
      <circle className="sc-packet" cx="0" cy="0" r="2.2" />
    </>
  ),
};

export default function StrengthIcon({ name }) {
  const scene = scenes[name];
  if (!scene) return null;

  return (
    <span className="card__icon" aria-hidden="true">
      <svg viewBox="0 0 40 38" width="40" height="38" fill="none"
           strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {scene}
      </svg>
    </span>
  );
}
