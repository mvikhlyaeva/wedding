// Список гостей. Ключ — короткий код для URL:
// https://grisha-masha.ru/?to=<код>
//
// Поля:
//   greeting — как обратиться (полностью, без запятой в конце)
//   name     — как показать имя в форме RSVP

export const guests = {
  x4m9: { greeting: "Дорогая Елена", name: "Елена Морозова" },
  k7r2: { greeting: "Дорогой Юрий", name: "Юрий Вихляев" },
  n3p8: { greeting: "Дорогая Анастасия", name: "Анастасия Вихляева" },
  w6t1: { greeting: "Дорогая Ксения", name: "Ксения Вихляева" },
  b5q4: { greeting: "Дорогая Виктория", name: "Виктория Вихляева" },
  j9f3: { greeting: "Дорогая Вера", name: "Вера Морозова" },
  h2v7: { greeting: "Дорогая Яна", name: "Яна Никитина" },
  d8k5: { greeting: "Дорогая Виктория", name: "Виктория Володина" },
  m4z6: { greeting: "Дорогая Ирина", name: "Ирина Курочкина" },
  r7c1: { greeting: "Дорогая Софья", name: "Софья Коровина" },
  g3n9: { greeting: "Дорогие Сергей и Мария", name: "Сергей и Мария" },
  t6w2: { greeting: "Дорогие Дмитрий и Виктория", name: "Дмитрий и Виктория" },
  y8p4: { greeting: "Дорогие Антон и Анастасия", name: "Антон и Анастасия" },
  s1h7: { greeting: "Дорогие Владимир и Наталья", name: "Владимир и Наталья" },
  c2q8: { greeting: "Дорогие Владимир и Мария", name: "Владимир и Мария" },
  f5n3: { greeting: "Дорогие Владимир и Елена", name: "Владимир и Елена" },
  p9k6: {
    greeting: "Дорогие Владимир и Анастасия",
    name: "Владимир и Анастасия",
  },
  z3v1: { greeting: "Дорогие Иван и Люба", name: "Иван и Люба" },
  e7m4: { greeting: "Дорогой Дима", name: "Дмитрий Дупленков" },
  q6r9: { greeting: "Дорогие Павел и Ксения", name: "Павел и Ксения" },
  u2b5: { greeting: "Дорогой Герман", name: "Герман Вертиков" },
  v8j2: { greeting: "Дорогие Борис и Татьяна", name: "Борис и Татьяна" },
  l4w7: {
    greeting: "Дорогие Антон и Анастасия",
    name: "Антон и Анастасия Поповы",
  },
  a8n2: { greeting: "Дорогие Денис и Анжелика", name: "Денис и Анжелика" },
};

export function getGuest() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const id = (params.get("to") || params.get("guest") || "")
    .toLowerCase()
    .trim();
  if (!id) return null;
  const guest = guests[id];
  if (!guest) return null;
  return { ...guest, code: id };
}
