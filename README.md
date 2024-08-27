# Vite + PUG template

```
npm i
npm run dev // запуск дев сервера
npm run host // запуск дев сервера с флагом хост(в локальной сети)
```

## Директория _public_

-fonts - хранение шрифтов
-images - хранение графики (jpg, png, webp, svg)
-video - опциональная директория

## Директория _src_

-assets/icons - директория из .svg фалйов которой генерируется спрайт. Очищать от каких либо свойств svg не нужно
-components

- blocks
  - common - блоки дублирующихся на разных страницах, таких как callback, popup и т.п.
  - \*page-name - директория для блоков спецмфичных конкретной странице
- layout - блоки категории layout - header, footer и т.п.
- ui - блоки интерфейса, часто переиспользуемые элементы - title, subtitle, text, button, input, logo, preview и т.п.

-data - ...
-js - скрипты проекта - app.js - точка входа.
-layouts - корневой layout подключенный ко всему проекту
-pages - страницы проекта
-scss - стили проекта - blocks - аналогично components/blocks - global - глобальные стили проекта - fonts.scss - шрифты - global.scss - глобальные стили проекта - mixins.scss - миксины - variables.scss - переменные - layout - стили для components/layout + wrapper - pages - стили для страниц - ui - стили для components/ui
styles.scss - точка входа

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
3. Открываем новую страницу с проектом

## Добавление ui компонентов

1. Создать файл в директории /src/scss/ui/\*component-name.scss
2. Подключить файл в style.scss
3. При необходимости создать .pug в директории /src/components/ui/\*component-name.pug
   -для каждого компонента добавлять внешний className
   `button.button(class=buttonClassName)`
   -при использовании такого компонента можно передать className
   ```
   - var buttonClassName = 'external-class-name'
   include /path/to/component
   ```

## Добавление блоков

Блок должен иметь 3 тега верхнего уровня. Пример:

```
section.example(class=exmapleClassName)
    .wrapper
        .example__inner

.example - основной контейнер блока. Не может содержать padding, marign.
.exmapleClassName - передается при подключении компонента. Не может иметь margin, padding.
.wrapper - единый wrapper для всего проекта
.example__inner - внутренний контейнер блока, может иметь свойства padding, быть grid, flex и т.д. Лучше чтобы он не имел свойства margin
```

1. Создать файл в директории /src/scss/ui/\*component-name.scss
  
    1.1
    Подключить файл в /src/components/components.pug
    `include ./layout/header`

    1.2 С использованием mixin
    -для каждого компонента добавлять внешний className
    component.pug

    ```
    mixin component(className)
   
    section.example(class=className)
    ```

При использовании такого компонента можно передать className или другие переременные
 ```
 +component('external-class-name')
 ```
или
 ```
 +component({className: 'className'})
 ```
2. Подключить файл в style.scss

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
Под каждый компонент, в котором есть клиентская логика, создается отдельный js файл, который импортируется в app.js

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
3. медиавыражения используются в формате

```
@media screen and (min-width: $tablet) {

}
```

4. Для стилизации состояний компонента использовать медиа

```
.example {
    &:active {
        ...rules
    }

    @media (hover: hover) {
        &:hover,
        &:focus {
            ...rules
        }
    }
}

```
