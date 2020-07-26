## Существует CSV-файл со списком игроков:
  Ник; Email; Зарегистрирован; Статус
  ivan2007; ivan@mmail.ru; 12.12.2007 15:41; On
  bigpetr; petr@mailtest.ru; 13.12.2007 20:41; Off
  semensemenych; sidr@testmail.ru; 14.12.2007 5:21; Off
  ktonetort; lapshin@testtest.ru; 15.12.2007 15:41; On
  agentsmith; smith@smith.com; 16.12.2007 3:28; On
  pushkin; pas@pas.ru; 17.12.2007 15:41; Off
  superstar; lermontov@yay.ru; 18.12.2007 15:41; Off
  go99; gogol@gggml.ru; 19.12.1999 15:41; Off

## Задание:
  ### Цель: продемонстрировать навыки владения JavaScript node.js и PostgreSQL.
  Требуется создать скрипт на языке JavaScript node.js, который должен:
  Создать таблицу в PostgreSQL под данную структуру файла.
  Все данные из CSV-файла экспортировать в созданную таблицу.
  Данные в поле "Зарегистрирован" должны храниться в формате INTEGER.
  После полного экспорта данных в таблицу отобразить на странице всех игроков со
  статусом On в порядке времени регистрации.

## Тестовое написано с использованием стека Node.js + PostgreSQL, а также пакетов:
       1. express https://www.npmjs.com/package/express
       2. fast-csv https://www.npmjs.com/package/fast-csv
       3. pg https://www.npmjs.com/package/pg

## Использование проекта
### Для того, чтобы использовать проект, необходимо:
       1. Клонировать репозиторий $ git clone https://github.com/Slizzygod/test-targem_games.git
       2. Установить зависимости проекта $ npm install
       3. Создать базу данных в PostgreSQL
       4. Подключиться к БД, использовав файл конфигурации ./config/config.js
       5. Запустить проект node index.js
       6. Сделать корневой запрос в адресной строке браузера http://localhost:4000/ 
       7. Наблюдать результаты тестового в консоле ide/редактора и на странице
