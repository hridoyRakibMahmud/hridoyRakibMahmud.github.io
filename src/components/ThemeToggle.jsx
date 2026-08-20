import { useEffect, useState } from 'react';

// The initial theme is resolved by a small script in index.html before first
// paint, so there is no flash of the wrong colours. This component only reads
// what that script decided and lets the visitor change it.

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Private browsing or storage disabled — the toggle still works for
      // this visit, it just won't be remembered. Not worth failing over.
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none"
           strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
           aria-hidden="true">
        {theme === 'dark' ? (
          // moon — currently dark, click for light
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
        ) : (
          // sun — currently light, click for dark
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
          </>
        )}
      </svg>
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
