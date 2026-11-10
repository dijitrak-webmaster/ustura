export default function ScissorMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="25" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="25" cy="25" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.2 21.8 25.5 3.5M21.8 21.8 6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}