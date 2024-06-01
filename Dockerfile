FROM node:20

# Создать рабочую директорию
WORKDIR /usr/src/app

# Копировать package.json и package-lock.json в рабочую директорию
COPY backend/package*.json ./

# Установить зависимости
RUN npm install

# Копировать исходный код приложения
COPY backend/ ./

# Открыть порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD [ "node", "index.js" ]
