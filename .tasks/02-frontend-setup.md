# 02 — Frontend: Scaffolding + Роутинг

## Цель
Создать React-приложение на Vite с настроенным роутингом и прокси к бэкенду.

## Что реализовать

- Создать проект через `npm create vite@latest` в папке `frontend/`
- Удалить лишнее из шаблона (App.css, logo, demo-контент)
- Установить `react-router-dom`
- Настроить роутинг:
  - `/` → `HomePage`
  - `/invite/:code` → `InvitePage`
  - Всё остальное → редирект на `/` или страница 404
- Настроить прокси в `vite.config.js`: `/api` → `http://localhost:5000`
- Создать пустые заглушки для страниц

## Критерии готовности

- `npm run dev` запускается без ошибок
- `/` и `/invite/test` открываются в браузере
- `fetch('/api/...')` проксируется к бэкенду (проверить в DevTools)
- Нет лишних зависимостей в `package.json`

## Файлы

```
frontend/
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── pages/
│       ├── HomePage.jsx
│       └── InvitePage.jsx
```
