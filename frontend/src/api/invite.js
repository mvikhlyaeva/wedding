export async function getInvite(code) {
  const res = await fetch(`/api/invite/${code}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
}

export async function submitRsvp(code, persons, note) {
  const res = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, persons, note }),
  });
  if (!res.ok) throw new Error('Ошибка отправки');
  return res.json();
}

export async function updateRsvp(code, persons, note) {
  const res = await fetch(`/api/rsvp/${code}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, persons, note }),
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
}
