# Инструкция по интеграции AI-HUB виджета в Bitrix24

## Общая информация

**Виджет AI-HUB** — это интерактивный чат-виджет с 3D аватаром робота для интеграции в Bitrix24. Виджет предоставляет пользователям быстрый доступ к информации через карточки быстрых действий и чат с ИИ-ассистентом.

## Ресурсы проекта

- **GitHub репозиторий:** `https://github.com/Diyarsh/crm-chat-assistant`
- **Vercel приложение:** `https://your-project-name.vercel.app` (замените на ваш URL после деплоя)
- **Документация по деплою:** см. файл `DEPLOY.md`

> **ВАЖНО:** После деплоя на Vercel замените `https://your-project-name.vercel.app` на актуальный URL вашего приложения во всех примерах ниже.

## Технические детали

- **Фреймворк:** React 18 + TypeScript
- **Сборщик:** Vite
- **Стили:** Tailwind CSS
- **3D графика:** Spline (@splinetool/react-spline)
- **UI компоненты:** shadcn/ui

## Способы интеграции в Bitrix24

### Вариант 1: Подключение через кастомный JavaScript (Рекомендуется)

Этот способ позволяет подключить виджет на любую страницу Bitrix24 через простой скрипт.

#### Шаг 1: Подготовка файлов

После деплоя на Vercel, виджет будет доступен по адресу:
```
https://your-project-name.vercel.app
```

#### Шаг 2: Добавление виджета на страницы Bitrix24

Добавьте следующий код в шаблон Bitrix24 или в настройки портала:

**Для подключения на всех страницах портала:**

1. Перейдите в **Настройки → Настройки продукта → Настройки портала**
2. Найдите раздел **"Пользовательский код"** или **"Дополнительный код"**
3. В поле **"Код перед закрывающим тегом </body>"** добавьте:

```html
<!-- AI-HUB Chat Widget -->
<div id="aihub-widget-root"></div>
<script type="module">
  // Загрузка виджета
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://your-project-name.vercel.app/assets/index-[hash].js';
  document.head.appendChild(script);
  
  // Загрузка CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://your-project-name.vercel.app/assets/index-[hash].css';
  document.head.appendChild(link);
</script>
```

**Важно:** Замените `[hash]` на актуальные хеши из собранного проекта. Хеши можно найти в файле `dist/index.html` после сборки.

#### Альтернативный способ (через iframe):

Если возникают проблемы с CORS или изоляцией стилей, можно использовать iframe:

```html
<!-- AI-HUB Chat Widget через iframe -->
<iframe 
  id="aihub-widget"
  src="https://your-project-name.vercel.app"
  style="position: fixed; bottom: 0; right: 0; width: 400px; height: 520px; border: none; z-index: 9999; display: none;"
  allow="clipboard-read; clipboard-write"
></iframe>

<script>
  // Показываем только виджет чата, скрывая основной контент
  window.addEventListener('load', function() {
    const iframe = document.getElementById('aihub-widget');
    iframe.onload = function() {
      // Скрываем основной контент страницы в iframe, оставляя только виджет
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDoc) {
        const body = iframeDoc.body;
        if (body) {
          // Находим виджет чата и показываем только его
          const widget = body.querySelector('[data-widget="aihub-chat"]');
          if (widget) {
            body.innerHTML = '';
            body.appendChild(widget);
          }
        }
      }
    };
    iframe.style.display = 'block';
  });
</script>
```

### Вариант 2: Интеграция как кастомный модуль Bitrix24

#### Шаг 1: Создание структуры модуля

Создайте структуру модуля в Bitrix24:

```
/local/modules/yourcompany.aihub/
  /install/
    index.php
    version.php
  /lang/
    /ru/
      /install/
        index.php
  /js/
    aihub-widget.js
  /templates/
    default.php
```

#### Шаг 2: Создание файла установки модуля

**`/local/modules/yourcompany.aihub/install/index.php`:**

```php
<?php
use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

class YourCompany_Aihub extends CModule
{
    public function __construct()
    {
        $arModuleVersion = [];
        include(__DIR__ . '/version.php');
        
        $this->MODULE_ID = 'yourcompany.aihub';
        $this->MODULE_VERSION = $arModuleVersion['VERSION'];
        $this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
        $this->MODULE_NAME = Loc::getMessage('AIHUB_MODULE_NAME');
        $this->MODULE_DESCRIPTION = Loc::getMessage('AIHUB_MODULE_DESCRIPTION');
    }
    
    public function DoInstall()
    {
        RegisterModule($this->MODULE_ID);
        CopyDirFiles(
            $_SERVER['DOCUMENT_ROOT'] . '/local/modules/yourcompany.aihub/install/js',
            $_SERVER['DOCUMENT_ROOT'] . '/local/js/aihub',
            true,
            true
        );
    }
    
    public function DoUninstall()
    {
        UnRegisterModule($this->MODULE_ID);
        DeleteDirFilesEx('/local/js/aihub');
    }
}
```

#### Шаг 3: Подключение виджета в шаблоне

В файле шаблона Bitrix24 (например, `/local/templates/your_template/footer.php`) добавьте:

```php
<?php
use Bitrix\Main\Page\Asset;

// Подключение виджета AI-HUB
Asset::getInstance()->addString(
    '<div id="aihub-widget-root"></div>'
);
Asset::getInstance()->addJs('https://your-project-name.vercel.app/assets/index-[hash].js');
Asset::getInstance()->addCss('https://your-project-name.vercel.app/assets/index-[hash].css');
?>
```

### Вариант 3: Интеграция через REST API Bitrix24

Если нужно интегрировать виджет с данными Bitrix24 через REST API:

#### Настройка REST приложения в Bitrix24

1. Перейдите в **Настройки → Настройки продукта → Другое → REST приложения**
2. Создайте новое приложение
3. Получите `CLIENT_ID` и `CLIENT_SECRET`

#### Пример интеграции с REST API

В файле `src/components/chat/AIHubChatWidget.tsx` можно добавить функцию для работы с Bitrix24 API:

```typescript
// Пример функции для получения данных из Bitrix24
const fetchBitrixData = async (endpoint: string, params: Record<string, any>) => {
  const response = await fetch(
    `https://your-bitrix-domain.bitrix24.ru/rest/${endpoint}?${new URLSearchParams(params)}`,
    {
      headers: {
        'Authorization': `Bearer ${bitrixAccessToken}`,
      },
    }
  );
  return response.json();
};
```

## Настройка виджета

### Изменение цветовой схемы

Цветовая схема виджета настроена в файле `src/index.css`. Основной цвет: `#102841` (HSL: 211 60% 16%).

Для изменения цветов отредактируйте CSS переменные:

```css
--chat-send-button: 211 60% 16%; /* Основной цвет кнопок */
--chat-header: 211 60% 16%; /* Цвет заголовка */
--primary: 211 60% 16%; /* Основной цвет интерфейса */
```

### Настройка карточек быстрых действий

Карточки настраиваются в файле `src/components/chat/QuickActions.tsx`:

```typescript
const quickActions: QuickAction[] = [
  {
    icon: Users,
    label: "Социальный пакет",
    subActions: [
      {
        icon: Calendar,
        label: "Информация по отпускам и выплатам",
        prompt: "Информация по отпускам и выплатам"
      },
      // ... другие подкатегории
    ]
  },
  // ... другие категории
];
```

### Настройка 3D аватара

URL 3D сцены Spline настраивается в компонентах:
- `src/components/chat/AIHubChatWidget.tsx` (кнопка и EmptyState)
- Текущий URL: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`

Для замены на свою 3D модель:
1. Загрузите модель в Spline
2. Получите URL сцены
3. Замените URL в компонентах

## Требования к системе

- **Bitrix24:** версия 20.0 и выше
- **Браузеры:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **JavaScript:** должен быть включен
- **Интернет:** требуется для загрузки виджета и 3D контента

## Безопасность

- Виджет загружается с вашего домена Vercel
- Все запросы идут через HTTPS
- CORS настройки должны быть правильно настроены на Vercel
- Рекомендуется использовать Content Security Policy (CSP) в Bitrix24

## Устранение неполадок

### Виджет не отображается

1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что URL виджета доступен
3. Проверьте настройки CORS на Vercel
4. Убедитесь, что JavaScript включен в браузере

### Проблемы с загрузкой 3D модели

1. Проверьте доступность URL Spline сцены
2. Убедитесь, что интернет-соединение стабильно
3. Проверьте консоль на ошибки загрузки ресурсов

### Конфликты стилей

Если виджет конфликтует со стилями Bitrix24:
1. Используйте вариант с iframe
2. Добавьте изоляцию стилей через Shadow DOM
3. Настройте более специфичные селекторы CSS

## Поддержка и контакты

При возникновении вопросов или проблем:
- Проверьте документацию в репозитории GitHub
- Изучите файл `DEPLOY.md` для информации о деплое
- Обратитесь к разработчику проекта

## Дополнительные ресурсы

- [Документация Bitrix24](https://dev.1c-bitrix.ru/)
- [Документация Vercel](https://vercel.com/docs)
- [Документация Spline](https://docs.spline.design/)

---

**Версия документации:** 1.0  
**Дата обновления:** Январь 2025
