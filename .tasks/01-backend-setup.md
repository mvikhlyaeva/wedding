# 01 — Backend: Scaffolding + EF Core

## Цель
Создать рабочий ASP.NET Core Web API проект с подключённой SQLite и готовой инфраструктурой для дальнейшей разработки.

## Что реализовать

- Создать проект через `dotnet new webapi` в папке `backend/`
- Удалить лишнее из шаблона (WeatherForecast и т.п.)
- Подключить пакеты:
  - `Microsoft.EntityFrameworkCore.Sqlite`
  - `Microsoft.EntityFrameworkCore.Design`
- Создать `AppDbContext` в `Data/`
- Зарегистрировать DbContext в `Program.cs` с SQLite
- Настроить CORS для `http://localhost:5173`
- Убедиться, что проект запускается на `http://localhost:5000`

## Критерии готовности

- `dotnet run` запускается без ошибок
- `GET http://localhost:5000` возвращает любой ответ (или 404 — норма)
- CORS не блокирует запросы с порта 5173
- `dotnet ef` команды работают (tool установлен)

## Файлы

```
backend/
├── backend.csproj
├── Program.cs
└── Data/
    └── AppDbContext.cs
```
