import BotanicalLine from '../components/BotanicalLine';
import './HomePage.css';

const schedule = [
  { time: '16:00', label: 'Сбор гостей' },
  { time: '17:30', label: 'Выездная регистрация' },
  { time: '18:30', label: 'Начало банкета' },
  { time: '22:00', label: 'Вынос торта' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — через листья оранжереи */}
      <div className="home-hero-photo">
        <img src="/photos/photo2.jpg" alt="" loading="eager" />
        <div className="home-hero-photo__overlay">
          <p className="home-hero-photo__label">Свадьба</p>
          <h1 className="home-hero-photo__date">27 июня 2026</h1>
        </div>
      </div>

      <main className="page page-enter">
        <section className="home-intro">
          <BotanicalLine />
        </section>

        <div className="divider" />

        <section className="section">
          <h2 className="section__eyebrow">Место</h2>
          <p className="section__serif">Бушово</p>
          <a
            className="section__link"
            href="https://yandex.ru/maps/?text=Бушово"
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть в Яндекс Картах →
          </a>
        </section>

        <div className="divider" />

        <section className="section">
          <h2 className="section__eyebrow">Программа</h2>
          <ul className="schedule">
            {schedule.map(({ time, label }) => (
              <li key={time} className="schedule__item">
                <span className="schedule__time">{time}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
