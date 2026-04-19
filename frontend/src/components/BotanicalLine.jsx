import './BotanicalLine.css';

export default function BotanicalLine() {
  return (
    <svg className="botanical" viewBox="0 0 240 44" fill="none" aria-hidden="true">
      {/* Center diamond */}
      <path pathLength="1" d="M120,20 L124,24 L120,28 L116,24 Z" />
      {/* Left main stem */}
      <path pathLength="1" d="M116,24 C98,24 78,17 56,21" />
      {/* Left leaf pair at ~x=86 */}
      <path pathLength="1" d="M86,19 C82,11 76,8 71,13" />
      <path pathLength="1" d="M86,19 C83,27 78,29 73,26" />
      {/* Left end line */}
      <path pathLength="1" d="M56,21 L20,21" />
      {/* Left tip leaf */}
      <path pathLength="1" d="M38,21 C34,13 29,11 25,15" />
      {/* Right main stem */}
      <path pathLength="1" d="M124,24 C142,24 162,17 184,21" />
      {/* Right leaf pair at ~x=154 */}
      <path pathLength="1" d="M154,19 C158,11 164,8 169,13" />
      <path pathLength="1" d="M154,19 C157,27 162,29 167,26" />
      {/* Right end line */}
      <path pathLength="1" d="M184,21 L220,21" />
      {/* Right tip leaf */}
      <path pathLength="1" d="M202,21 C206,13 211,11 215,15" />
    </svg>
  );
}
