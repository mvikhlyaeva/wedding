import { useState } from 'react';
import { submitRsvp, updateRsvp } from '../api/invite';
import './RsvpForm.css';

export default function RsvpForm({ code, persons, rsvp }) {
  const isUpdate = rsvp !== null;

  const [answers, setAnswers] = useState(() =>
    persons.map((p) => ({
      id: p.id,
      attending: p.attending ?? null,
      dietaryRestrictions: p.dietaryRestrictions ?? '',
    }))
  );
  const [note, setNote] = useState(rsvp?.note ?? '');
  const [editing, setEditing] = useState(!isUpdate);
  const [submitted, setSubmitted] = useState(isUpdate);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function setAttending(personId, value) {
    setAnswers((prev) =>
      prev.map((a) => (a.id === personId ? { ...a, attending: value } : a))
    );
  }

  function setDietary(personId, value) {
    setAnswers((prev) =>
      prev.map((a) => (a.id === personId ? { ...a, dietaryRestrictions: value } : a))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const unanswered = answers.filter((a) => a.attending === null);
    if (unanswered.length > 0) {
      setError('Пожалуйста, ответьте за каждого гостя');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fn = isUpdate && submitted ? updateRsvp : submitRsvp;
      await fn(code, answers, note || null);
      setSubmitted(true);
      setEditing(false);
    } catch {
      setError('Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted && !editing) {
    return (
      <div className="rsvp-confirmation">
        <p className="rsvp-confirmation__text">Спасибо! Ваш ответ сохранён.</p>
        <button className="rsvp-btn rsvp-btn--ghost" onClick={() => setEditing(true)}>
          Изменить ответ
        </button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {persons.map((person, i) => (
        <div key={person.id} className="rsvp-person">
          <p className="rsvp-person__name">{person.name}</p>

          <div className="rsvp-attend">
            <button
              type="button"
              className={`rsvp-attend__btn ${answers[i].attending === true ? 'rsvp-attend__btn--active' : ''}`}
              onClick={() => setAttending(person.id, true)}
            >
              Приду
            </button>
            <button
              type="button"
              className={`rsvp-attend__btn ${answers[i].attending === false ? 'rsvp-attend__btn--active' : ''}`}
              onClick={() => setAttending(person.id, false)}
            >
              Не приду
            </button>
          </div>

          <label className="rsvp-label">
            Ограничения в еде, аллергии
            <textarea
              className="rsvp-textarea"
              rows={2}
              value={answers[i].dietaryRestrictions}
              onChange={(e) => setDietary(person.id, e.target.value)}
              placeholder="Если есть — напишите"
            />
          </label>
        </div>
      ))}

      <label className="rsvp-label">
        Пожелания
        <textarea
          className="rsvp-textarea"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Необязательно"
        />
      </label>

      {error && <p className="rsvp-error">{error}</p>}

      <button className="rsvp-btn" type="submit" disabled={loading}>
        {loading ? 'Отправляем...' : isUpdate && submitted ? 'Сохранить изменения' : 'Отправить'}
      </button>
    </form>
  );
}
