# 📚 Lexingo

**Lexingo** — платформа для изучения языков.
Проект построен на **Next.js 15** и архитектуре **Feature-Sliced Design (FSD)** с использованием App Router.

## 🏗️ Архитектура проекта

### 📂 Структура папок

```
src/
├── app/                    # App Router: страницы, layout, провайдеры
│   ├── layout.tsx         # Глобальный layout
│   ├── page.tsx           # Главная страница
│   ├── providers/         # Провайдеры темы, авторизации и т.п.
│   └── [route]/           # Вложенные маршруты страниц
├── processes/             # Бизнес-процессы (композиции фич)
├── widgets/               # Виджеты (сборка фич и сущностей)
├── features/              # Действия пользователя (единицы поведения)
├── entities/              # Бизнес-сущности (данные и логика)
├── shared/                # Переиспользуемые ресурсы
│   ├── ui/                # Примитивы интерфейса (Button, Input и т.д.)
│   ├── lib/               # Утилиты и вспомогательные функции
│   ├── config/            # Глобальные конфиги (env, themes)
│   ├── api/               # API-клиенты
│   └── styles/            # Общие стили (включая SCSS)
```

## 🔁 Слои и правила импорта

Слои могут импортировать только **находящиеся ниже по иерархии**:

```
app
└─ processes
   └─ widgets
      └─ features
         └─ entities
            └─ shared
```

**Правила:**

* ❌ Циклические зависимости запрещены
* ✅ Используются абсолютные импорты через алиасы: `@/shared`, `@/entities`, `@/features` и т.д.
* ✅ Для линтинга архитектуры используется [Steiger](https://github.com/feature-sliced/steiger)

## ⚙️ Генерация компонентов (через Steiger)

```bash
# Генерация UI-компонента
npx steiger create component

# Генерация фичи
npx steiger create feature

# Генерация виджета
npx steiger create widget
```

> Конфигурация линтера и правил подключена через `@feature-sliced/eslint-config`.

## 🧪 Разработка

```bash
# Установка зависимостей
npm install

# Запуск в dev-режиме
npm run dev

# Сборка проекта
npm run build

# Линтинг
npm run lint
```

## 🧰 Используемые технологии

* **Next.js 15** (App Router)
* **React 19**
* **TypeScript**
* **Radix UI** + **@radix-ui/themes**
* **SCSS Modules**
* **Feature-Sliced Design**
* **Steiger**
* **ESLint + Prettier**
* **tailwindcss/postcss (опционально)**

## 🚀 Запуск

```bash
npm run dev
```

Открой [`http://localhost:3000`](http://localhost:3000) в браузере.

Начни с редактирования файла:

```
src/app/page.tsx
```

## 🧠 Полезные ссылки

* [Feature-Sliced Design (документация)](https://feature-sliced.design/)
* [Next.js Docs](https://nextjs.org/docs)
* [Steiger](https://github.com/feature-sliced/steiger)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
