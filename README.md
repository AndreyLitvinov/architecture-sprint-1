# Mesto

## Задание 1
### Frontend

Микрофронтенды работают на https://webpack.js.org/concepts/module-federation/

**Контексты (микрофронтенды):**
- host - хост приложения
- auth - регистрация/авторизация
- profile - блок с информацией о профиле и редактирование профиля
- places - места, сама стена и все что связанно с лайками загрузкой удалением мест
- shared-components - общие компоненты, модальные окна, по хорошему можно выделить в отдельный пакет
- shared-contexts - общие контексты, пока только контекст пользователя, можно заменить на более надежные подходы к хранению состояния.

**Внутренняя структура сохранена.**

### Запуск

Скрипты что бы быстро запустить.

#### Windows
```powershell

cd ./microfrontend

Start-Process powershell -ArgumentList "cd ./host; npm install; npm start"
Start-Process powershell -ArgumentList "cd ./auth; npm install; npm start"
Start-Process powershell -ArgumentList "cd ./profile; npm install; npm start"
Start-Process powershell -ArgumentList "cd ./places; npm install; npm start"
;

```

#### Linux
```powershell

cd ./microfrontend
( cd ./host && npm install && npm start ) &
( cd ./auth && npm install && npm start ) &
( cd ./profile && npm install && npm start ) &
( cd ./places && npm install && npm start ) &

```

## Задание 2
https://disk.yandex.ru/d/AgUPiHEFg7XZ7w