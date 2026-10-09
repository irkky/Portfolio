/** Custom vector lettering: a compact wordmark with extended K diagonals. */
export default function RkkyLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 124 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-[93px] md:h-7 md:w-[108.5px] overflow-visible"
    >
      <g fill="currentColor">
        <path fillRule="evenodd" d="M2 2h12c7 0 11 3.4 11 9 0 4-2 6.8-5.6 8.2L27 30h-8l-6.6-9.5H9V30H2V2Zm7 6v6.5h5c2.6 0 4-1.1 4-3.3S16.6 8 14 8H9Z" clipRule="evenodd" />
        <path d="M31 2h7v11L48.5 2H57L44 15.3 57.5 30H48L38 18.5V30h-7V2Z" />
        <path d="M61 2h7v11L78.5 2H87L74 15.3 87.5 30H78L68 18.5V30h-7V2Z" />
        <path d="M87 2h8l6.5 11L108 2h8l-11 18v10h-7V20L87 2Z" />
      </g>
      <circle cx="120" cy="27" r="3" fill="var(--accent, #b6adff)" />
    </svg>
  );
}
