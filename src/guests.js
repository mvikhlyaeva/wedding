// Список гостей. Ключ — короткий slug для URL, который потом
// разошлёте каждому гостю: например, https://your-site/?to=anna
//
// Поля:
//   greeting — как обратиться (полностью, без запятой в конце)
//   name     — как показать имя в форме RSVP
//
// Примеры разных форматов:
//   - одиночка:  { greeting: 'Дорогая Анна', name: 'Анна' }
//   - пара:      { greeting: 'Дорогие Иван и Мария', name: 'Иван и Мария' }
//   - семья:     { greeting: 'Дорогая семья Ивановых', name: 'Семья Ивановых' }

export const guests = {
  // ↓ замените на реальный список ↓
  'elena': { greeting: 'Дорогая Елена', name: 'Елена' },
  'ivan': { greeting: 'Дорогой Иван', name: 'Иван' },
  'kuz': { greeting: 'Дорогие Владимир и Наталья', name: 'Владимир и Наталья' },
}

export function getGuest() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const id = (params.get('to') || params.get('guest') || '').toLowerCase().trim()
  if (!id) return null
  return guests[id] || null
}
