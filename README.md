![new](https://github.com/reurairin/ML_2S_Final/actions/workflows/python-app.yml/badge.svg)

# Group-11 Project 2nd Semester Text-to-speech

Итоговый проект для дисциплины "Программная инженерия 2" УрФУ. Приложение для перевода текста на английском языке в аудио.

## Авторы

* [@Zhenya127](https://github.com/Zhenya127): Евгения Прасолова
* [@pyretttt](https://github.com/pyretttt): Семен Бакулин
* [@Den2909](https://github.com/Den2909): Денис Тряпицын
* [@reurairin](https://github.com/reurairin): Данил Макушев

## Описание приложения

Для приложения выбрана ранее обученная модель на платформе Hugging face `microsoft/speecht5_tts`. Ссылка на модель: [speecht5_tts](https://huggingface.co/microsoft/speecht5_tts). После предварительной обработки входного текста кодировщик-декодер моделирует преобразование в последовательность, а затем пост-сети генерируют выходные данные в аудио-речь на основе выходных данных декодера.

Внешний вид
![Иллюстрация к проекту](https://github.com/reurairin/ML_2S_Final/blob/7d51f80e2e371e9b2ca8b230a0e0f769904b4267/application_images/Text-to-Speech.jpg)

### Ссылка на приложение

http://84.201.140.47:8000

## Бэкэнд

Бэкэенд приложения реализован при помощи FastAPI.

### Установка зависимостей

```
pip install -r requirements.txt
```

### Запуск приложения

```
uvicorn app:app --reload
```

### Запуск тестов

```
pytest
```

## Клиентское приложение

Клиентское приложение реализовано при помощи React+Vite.

### Требования

Для запуска клиентского приложения потребуются следующие программы.

-   Node.js https://nodejs.org/en

### Запуск локального сервера

1. Переходим в папку, в которой находится клиентское приложение

```
cd tts-client
```

2. Устанавливаем зависимости

```
npm i
```

3. Запускаем local development server

```
npm run dev
```

### Сборка для production

1. Переходим в папку, в которой находится клиентское приложение

```
cd tts-client
```

2. В файле `.env.production` в переменную окружения `VITE_BASE_URL` записываем IP-адрес и порт удалённого сервера

```
VITE_BASE_URL='http://127.0.0.1:8000'
```

3. Устанавливаем зависимости

```
npm i
```

4. Собираем клиентское приложение

```
npm run build
```

5. В папке `/tts-client/dist` появляются скомпилированные файлы проекта. После этого можно запускать сервер FastAPI (сервер уже сконфигурирован на эту папку).