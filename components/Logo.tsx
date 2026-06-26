export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="YETI Tires logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* tire ring */}
      <circle cx="24" cy="24" r="21" stroke="url(#g)" strokeWidth="3" />
      <circle cx="24" cy="24" r="9" stroke="url(#g)" strokeWidth="2.2" opacity="0.5" />
      {/* mountain / yeti peak */}
      <path d="M24 12 L33 30 H15 Z" fill="url(#g)" />
      <path d="M24 12 L28 20 L24 23 L20 20 Z" fill="#ffffff" opacity="0.9" />
      <defs>
        <linearGradient id="g" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff7a3c" />
          <stop offset="1" stopColor="#f24f1e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
