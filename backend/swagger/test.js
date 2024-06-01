/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - message
 *         - senderId
 *         - receiverId
 *         - createdAt
 *       properties:
 *         _id:
 *           type: string
 *           description: Генерируется автоматически
 *         message:
 *           type: string
 *           description: Сообщение
 *         senderId:
 *           type: string
 *           description: ID отправителя
 *         receiverId:
 *           type: string
 *           description: ID получателя
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Дата создания сообщения
 *       example:
 *         _id: 5e6e4e7e1c9d440000d6b1f2
 *         message: Привет
 *         senderId: 5e6e4e7e1c9d440000d6b1f2
 *         receiverId: 5e6e4e7e1c9d440000d6b1f2
 *         createdAt: 2024-03-14T09:00:00.000Z
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Генерируется автоматически
 *         firstName:
 *           type: string
 *           description: Имя пользователя
 *         lastName:
 *           type: string
 *           description: Фамилия пользователя
 *         bio:
 *           type: string
 *           description: Биография пользователя
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Дата создания пользователя
 *         is_online:
 *           type: boolean
 *           description: Статус пользователя
 *         email:
 *           type: string
 *           description: Почта пользователя
 *       example:
 *         id: 5e6e4e7e1c9d440000d6b1f2
 *         firstName: Асхат
 *         lastName: Султанов
 *         bio: Программист
 *         createdAt: 2024-03-14T09:00:00.000Z
 *         email: askhat@gmail.com
 *         is_online: 0
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: Генерируется автоматически
 *         title:
 *           type: string
 *           description: Название задачи
 *         status:
 *           type: string
 *           description: Статус задачи
 *         description:
 *           type: string
 *           description: Описание задачи
 *         created_at:
 *           type: string
 *           format: date
 *           description: Дата создания задачи
 *         updated_at:
 *           type: string
 *           format: date
 *           description: Дата обновления задачи
 *       example:
 *         _id: 5e6e4e7e1c9d440000d6b1f2
 *         title: Задача 1
 *         status: pending
 *         description: Описание задачи
 *         created_at: 2024-03-14T09:00:00.000Z
 *         updated_at: 2024-03-14T09:00:00.000Z
 */
