// Список гостей. Ключ — короткий код для URL:
// https://grisha-masha.ru/?to=<код>
//
// Поля:
//   greeting — как обратиться (полностью, без запятой в конце)
//   name     — как показать имя в форме RSVP

export const guests = {
  'x4m9': { greeting: 'Дорогая Елена',            name: 'Елена Морозова' },
  'k7r2': { greeting: 'Дорогой Юрий',             name: 'Юрий Вихляев' },
  'n3p8': { greeting: 'Дорогая Анастасия',         name: 'Анастасия Вихляева' },
  'w6t1': { greeting: 'Дорогая Ксения',            name: 'Ксения Вихляева' },
  'b5q4': { greeting: 'Дорогая Виктория',          name: 'Виктория Вихляева' },
  'j9f3': { greeting: 'Дорогая Вера',              name: 'Вера Морозова' },
  'h2v7': { greeting: 'Дорогая Яна',               name: 'Яна Никитина' },
  'd8k5': { greeting: 'Дорогая Виктория',          name: 'Виктория Володина' },
  'm4z6': { greeting: 'Дорогая Ирина',             name: 'Ирина Курочкина' },
  'r7c1': { greeting: 'Дорогая Софья',             name: 'Софья Коровина' },
  'g3n9': { greeting: 'Дорогие Сергей и Мария',    name: 'Сергей и Мария' },
  't6w2': { greeting: 'Дорогие Дмитрий и Виктория',name: 'Дмитрий и Виктория' },
  'y8p4': { greeting: 'Дорогие Антон и Анастасия', name: 'Антон и Анастасия' },
  's1h7': { greeting: 'Дорогие Владимир и Наталья',name: 'Владимир и Наталья' },
}

export function getGuest() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const id = (params.get('to') || params.get('guest') || '').toLowerCase().trim()
  if (!id) return null
  return guests[id] || null
}
