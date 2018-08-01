### Mera Library Application 
This project is built in order to be a kind of playground for future developers, enjoy.

### Back End overview
Установить и настроить JDK 8

### Front End overview
Everything is situated in ./books-library-app/src/main/webapp , Node.js and NPM is must have on your PC.

CSS - style.css is the main file for styling the App.
For cool guys there is a gulp watch for preprocessor, like SASS. To compile your .sass to .css just make -gulp sass

JS - folder for angular stuff.

LIB - folder for core dependencies. Better use npm.

### Database FAQ
Установить PostgreSQL.(https://www.postgresql.org/download/)
При установке укажите пароль “postgres”.
Настройка:
В меню "Пуск" Windows запустите приложение pgAdmin4.
В левом окне выберите "Servers", затем "PostgreSQL10".
Введите указанный ранее пароль  - “postgres”. Щелкните ПКМ на "Databases" и выберите "Create" затем "Database".
В поле "Database" введите название "school_lib". Нажмите "Save".

### Running the application
To run the application open Idea and navigate books-library-app\src\main\java\ru\mera\lib 
then RMB on LibraryApp.java and in dropdown select run.

### Known issues

# FE
1)	При удалении самого себя из списка юзеров сразу разорвать сессию и выйти из приложения
2)	При слишком длинном названии книги сделать перенос на следующую строку
3)	Books Management боковое меню без пробела 
4)	Пункты меню не подсвечивечиваются
5)	Цвет кнопок должен передавать смысл
6)	На выдаче книг книг кнопка Close не активна
7)	Кнопка профиля слишком маленькая сделать ее больше
8)	Проблемы при отображении таблицы (съезжают ряды)

# BE
1) Вместо кастомной пагинации нужно использовать пагинацию, которую предоставляет Spring
2) Класс LoginForm избыточный, вместо него можно использовать User (в LoginController)
3) Лишние импорты
4) Недописаны тесты