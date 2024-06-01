/**
 * @swagger
 * tags:
 *   name: Задачи
 *   description: Эндпоинты для работы с задачами
 * /api/task:
 *   get:
 *     summary: Получить список задач
 *     tags: [Задачи]
 *     responses:
 *       200:
 *         description: Возвращает список задач
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Задачи]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description:  Задача создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Ошибка сервера
 * /task/{id}:
 *   get:
 *     summary: Получить задачу по id
 *     tags: [Задачи]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id задачи
 *     responses:
 *       200:
 *         description: Task by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Задача не найдена
 *   put:
 *    summary: Обновить задачу по id
 *    tags: [Задачи]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  id задачи
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: Задача обновлена
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: Задача не найдена
 *      500:
 *        description: Ошибка сервера
 *   delete:
 *     summary: Удалить задачу по id
 *     tags: [Задачи]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id задачи
 *
 *     responses:
 *       200:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
