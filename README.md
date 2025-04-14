# Vite + PUG template
```
npm i
npm run dev // запуск дев сервера
npm run host // запуск дев сервера с флагом хост(в локальной сети)
```

## Структура проекта
- _public_ - шрифты, изображения, видео
- src
  - assets/icons - Используется для генерации спрайта.
  - components
      - blocks
          - common - блоки дублирующихся на разных страницах, таких как callback, popup и т.п.
          - \*page-name - директория для блоков специфичных конкретной странице
        - layout - блоки категории layout - header, footer и т.п.
        - ui - блоки интерфейса, часто переиспользуемые элементы - title, subtitle, text, button, input, logo, preview и т.п.
  - data - ...
  - js - скрипты проекта - app.js - точка входа.
  - layouts - корневой layout подключенный ко всему проекту
  - pages - страницы проекта
  - scss - стили проекта:
        - ui, blocks(common, home и т.п.), layout, pages
        - global: глобальные стили проекта - fonts, global, mixins, variables

## Подключение шрифтов
Используемые форматы - .woff2, .woff. При использовании вариативного шрифта подключаем .ttf дополнительно

1. Скачиваем из google fonts, конвертируем, добавляем в директорию /public/fonts/
2. В файле fonts.scss подключаем локальный шрифт. В файле есть базовый шаблон

## Добавление графики
Вся графика добавляется в директорию /public/images/

## Добавление svg иконок в спрайт
Текущий шаблон имеет проблему с обновлением спрайта в dev моде, позже будет фикс.
Рабочий алгоритм:

1. Добавляем .svg в /src/assets/icons/
2. Перезапускаем dev server
3. Использование  
  ```
   svg
    use(href="/__spritemap#sprite-iconname")
  ```

## Добавление компонентов
1. Создать директорию в /src/scss/ui или /src/scss/common и т.п.
2. При необходимости создать в директории scss файл и подключить его в style.scss
3. При необходимости создать в директории pug файл и подключить его в components.pug

## Создание ui компонентов
- для каждого компонента добавлять внешний className
  `button.button(className='')`

  или

  `button.button({className=''})`
- при использовании такого компонента можно передать className
   ```
   +buttonClassName('external-class-name')
   ```
  или
  ```
   +buttonClassName({className='external-class-name'})
   ```
## Добавление блоков
Блок должен иметь 3 тега верхнего уровня. Пример:

```
section.example(class=exmapleClassName)
    .wrapper
        .example__inner
```

- .example - основной контейнер блока. Не может содержать padding, marign.
- .exmapleClassName - передается при подключении компонента. Не может иметь margin, padding.
- .wrapper - единый wrapper для всего проекта
- .example__inner - внутренний контейнер блока, может иметь свойства padding, быть grid, flex и т.д. Лучше чтобы он не имел свойства margin

## Добавление страниц
Главная страница располагается в директории /src/pages/
1. Создать вложенную директорию внутри /src/pages/
2. создать 2 файла

   1. index.pug

   ```
   extends /layouts/main.pug

   block pageContent
       section.page-404__section
           .wrapper
               | 404
   ```

   2. index.pug.json

   ```
   {
       "title": "Site title | Страница не найдена",
       "className": "page-404"
   }
   ```

3. Создать .scss файл в директории /src/scss/
4. Подключить .scss файл в style.scss

## Подключение js
Все сторонние пакеты/библиотеки устанавливать из npm
В проекте используется модульная система с точкой входа - .app.js
Под каждый компонент, в котором есть клиентская логика, создается отдельный js файл с экспортируемой функцией инициализации, которая импортируется и вызывается в app.js

## SCSS
1. Таблица стилей должна быть единообразной. Пример
   ```
   .example {
       flex-grow flex-shrink align-self и другие self свойства
       z-index
       position
       top
       ..
       bottom
       display
       flex-..
       grid-..
       color
       font-..
       padding
       margin
       width
       height
   }
   ```
2. Вложенность можно использвоать любую, если это не мешает чтению таблицы стилей
3. медиавыражения включаются через миксины

```
  @include vp-tablet {
    ..rules
  }
```

4. Для стилизации состояний компонента использовать медиа и имеющиеся миксины(hover, hover-focus)

```
.example {
    &:active {
        ...rules
    }

    @includes hover-focus {
        &:hover,
        &:focus {
            ...rules
        }
    }
}

```
