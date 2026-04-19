import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvite } from '../api/invite';
import RsvpForm from '../components/RsvpForm';
import BotanicalLine from '../components/BotanicalLine';
import HomePage from './HomePage';
import './InvitePage.css';

const schedule = [
  { time: '16:00', label: 'Сбор гостей' },
  { time: '17:30', label: 'Выездная регистрация' },
  { time: '18:30', label: 'Начало банкета' },
  { time: '22:00', label: 'Вынос торта' },
];

const IVORY  = '#F5F0E7';
const ACCENT = '#F0E4B8';

/* Wave separator between sections.
   toAccent=true  → transition from ivory section to accent section
   toAccent=false → transition from accent section to ivory section */
function Wave({ toAccent }) {
  const bg   = toAccent ? ACCENT : IVORY;
  const fill = toAccent ? IVORY  : ACCENT;
  return (
    <div className="inv-wave" style={{ background: bg }}>
      <svg
        viewBox="0 0 390 36"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0,0 L390,0 L390,12 Q195,36 0,12 Z" fill={fill} />
      </svg>
    </div>
  );
}

export default function InvitePage() {
  const { code } = useParams();
  const [guest, setGuest] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    getInvite(code)
      .then(setGuest)
      .catch(() => setError(true));
  }, [code]);

  if (error) return <p className="invite-message">Ошибка загрузки. Попробуйте позже.</p>;
  if (guest === undefined) return <p className="invite-message">Загрузка...</p>;
  if (guest === null) return <HomePage />;

  return (
    <>
      {/* ① Hero — полноэкранное фото */}
      <div className="hero-photo">
        <img src="/photos/photo3.jpg" alt="" loading="eager" />
        <div className="hero-overlay">
          <p className="hero-overlay__eyebrow">СВАДЬБА</p>
          <p className="hero-overlay__date">27 · 06 · 2026</p>
          <p className="hero-overlay__sub">Бушово</p>
        </div>
      </div>

      <main className="invite-main">

        {/* ② Приветствие */}
        <section className="inv-section inv-section--ivory">
          <div className="inv-content">
            <BotanicalLine />
            <p className="inv-eyebrow">Приглашение</p>
            <h1 className="inv-name">{guest.name}</h1>
            <div className="inv-rule" />
            <p className="inv-body">
              Мы рады пригласить вас разделить с нами этот особенный день.
              Будем счастливы видеть вас на нашей свадьбе.
            </p>
          </div>
        </section>

        <Wave toAccent />

        {/* ③ Дата и место */}
        <section className="inv-section inv-section--accent">
          <div className="inv-content">
            <p className="inv-eyebrow inv-eyebrow--dark">ИЮНЬ · 2026</p>
            <div className="inv-date-num">27</div>
            <p className="inv-location-name">Бушово</p>
            <a
              href="https://yandex.ru/maps/?text=Бушово"
              className="inv-map-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Показать на карте →
            </a>
          </div>
        </section>

        <Wave toAccent={false} />

        {/* ④ Программа дня */}
        <section className="inv-section inv-section--ivory">
          <div className="inv-content">
            <h2 className="inv-section-title">Программа дня</h2>
            <ul className="inv-schedule">
              {schedule.map((item) => (
                <li className="inv-schedule-row" key={item.time}>
                  <span className="inv-schedule-icon">◇</span>
                  <span className="inv-schedule-time">{item.time}</span>
                  <span className="inv-schedule-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Wave toAccent />

        {/* ⑤ Дресс-код */}
        <section className="inv-section inv-section--accent">
          <div className="inv-content">
            <h2 className="inv-section-title">Дресс-код</h2>
            <p className="inv-body inv-body--sm">
              Будем рады, если вы поддержите воздушную цветовую гамму торжества
            </p>
            <div className="inv-swatches">
              <div className="inv-swatch">
                <div className="inv-swatch-circle" style={{ background: '#F2CECA' }} />
                <span className="inv-swatch-name">Нежно-<br />розовый</span>
              </div>
              <div className="inv-swatch">
                <div className="inv-swatch-circle" style={{ background: '#F0E6CC' }} />
                <span className="inv-swatch-name">Сливочное<br />масло</span>
              </div>
              <div className="inv-swatch">
                <div className="inv-swatch-circle" style={{ background: '#C4D4B8' }} />
                <span className="inv-swatch-name">Пастельный<br />зелёный</span>
              </div>
            </div>
          </div>
        </section>

        <Wave toAccent={false} />

        {/* ⑥ RSVP */}
        <section className="inv-section inv-section--ivory">
          <div className="inv-content">
            <h2 className="inv-section-title">Вы придёте?</h2>
            <div className="inv-rsvp-wrap">
              <RsvpForm code={guest.code} persons={guest.persons} rsvp={guest.rsvp} />
            </div>
          </div>
        </section>

        <Wave toAccent />

        {/* ⑦ Closing */}
        <section className="inv-section inv-section--accent inv-section--closing">
          <div className="inv-content">
            <BotanicalLine />
            <p className="inv-closing-text">Будем рады видеть вас</p>
            <p className="inv-closing-heart">♡</p>
            <p className="inv-closing-sig">С любовью</p>
          </div>
        </section>

      </main>
    </>
  );
}
