# Wedding Invitation Site

Свадебный сайт-приглашение с персонализацией по коду и RSVP-формой.

## Stack

- **Frontend:** React (Vite), plain CSS
- **Backend:** ASP.NET Core Web API (C#, .NET 8)
- **Database:** SQLite via Entity Framework Core

## Project Structure

```
wedding/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── vite.config.js
├── backend/           # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
└── CLAUDE.md
```

## Run Commands

```bash
# Backend
cd backend && dotnet run

# Frontend
cd frontend && npm run dev

# DB migrations
cd backend && dotnet ef migrations add <Name> && dotnet ef database update
```

Backend: `http://localhost:5000` — Frontend: `http://localhost:5173`
Frontend proxies `/api/*` to backend via Vite config.

## Pages

- `/` — главная с информацией о свадьбе
- `/invite/:code` — персональная страница + RSVP-форма

## Architecture

- Гостю выдаётся короткий уникальный код (напр. `"ivan42"`), встроенный в ссылку
- По коду загружается персональная информация и форма RSVP
- Гость может изменить свой ответ после отправки
- Авторизации нет — код и есть идентификатор

Модели и эндпоинты определяются по мере реализации, не фиксировать заранее.

## UI Rules

- **Mobile-first** — верстать с телефона, десктоп адаптируется
- **Минимализм** — светлый фон, много воздуха, никакого визуального шума
- **Типографика** — крупные заголовки, одна serif-гарнитура для акцентов, readable body
- **Элегантность** — тонкие линии, сдержанная палитра (2–3 цвета), без скруглений-пузырей
- **Анимации** — только если добавляют ощущение, не отвлекают; появление fade-in уместно
- Никаких UI-библиотек (MUI, Tailwind, Bootstrap) — только plain CSS

## Dev Rules

- Компоненты маленькие, каждый делает одно
- Логика, используемая в одном месте — остаётся там, не выносится
- Fetch в компонентах или тонких `api/`-обёртках — без стейт-менеджеров
- Контроллеры тонкие: валидация → EF → ответ
- EF Core напрямую, без repository pattern

## Constraints

- Нет авторизации, нет админки
- Нет Redux, Zustand, React Query и аналогов
- Нет лишних слоёв абстракции
- Нет Docker на старте
- Нет тестов, если явно не запрошено
- Не добавлять поля, эндпоинты и страницы сверх описанного
