# Инструкции по деплою на Vercel

## Быстрый деплой через Vercel CLI

### 1. Установите Vercel CLI (если еще не установлен)

```bash
npm i -g vercel
```

### 2. Войдите в Vercel

```bash
vercel login
```

### 3. Деплой проекта

```bash
vercel
```

При первом деплое Vercel задаст несколько вопросов:
- **Set up and deploy?** → Yes
- **Which scope?** → Выберите ваш аккаунт
- **Link to existing project?** → No (для первого деплоя)
- **What's your project's name?** → `crm-chat-assistant` (или любое другое имя)
- **In which directory is your code located?** → `./` (текущая директория)

### 4. Production деплой

```bash
vercel --prod
```

## Деплой через GitHub

### 1. Подключите репозиторий к Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New Project"
3. Импортируйте ваш GitHub репозиторий
4. Vercel автоматически определит настройки для Vite проекта

### 2. Настройки проекта

Vercel автоматически определит:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Переменные окружения (если нужны)

Если в проекте используются переменные окружения, добавьте их в настройках проекта:
- Settings → Environment Variables

## После деплоя

После успешного деплоя вы получите URL вида:
- `https://your-project-name.vercel.app`

Этот URL можно использовать для интеграции виджета в Bitrix24.

## Обновление деплоя

При каждом push в основную ветку (main/master) Vercel автоматически создаст новый деплой.

Для ручного обновления:
```bash
vercel --prod
```

## Полезные команды

- `vercel` - деплой preview версии
- `vercel --prod` - деплой production версии
- `vercel logs` - просмотр логов
- `vercel inspect` - информация о деплое
