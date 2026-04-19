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
- `/:code` — персональная страница + RSVP-форма (неизвестный код → показывает HomePage)

## Architecture

- Гостю выдаётся короткий уникальный код (напр. `"ivan42"`), встроенный в ссылку
- По коду загружается персональная информация и форма RSVP
- Гость может изменить свой ответ после отправки
- Авторизации нет — код и есть идентификатор

Модели и эндпоинты определяются по мере реализации, не фиксировать заранее.

## UI Rules

- **Mobile-first** — верстать с телефона, десктоп адаптируется
- **Editorial / Pinterest** — стиль журнала luxury: крупная типографика, органические декоративные элементы, щедрые отступы
- **Типографика** — гигантские числа и имена как арт-объекты; serif-курсив для акцентов; мелкие трекинг-заголовки uppercase для подписей
- **Палитра** — ivory `#F5F0E8`, champagne `#C8AA82`, soft pink `#C49898`, sage `#8A9980`, text `#1A1612`; не более 4 цветов в одном блоке
- **Декор** — ботаническая SVG-линия с `stroke-dashoffset` draw-анимацией; corner-frame акценты через CSS `background` multiple-gradient; тонкие разделительные линии
- **Анимации** — `fadeUp` при входе страницы (staggered), `draw` для SVG; scroll-driven для волнового расписания; ничего лишнего
- **Элементы** — без скруглений, без теней, без border-radius; только прямые углы и тонкие линии
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
