import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import isAuthenticated from '../../../middlewares/isAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';

const router = Router();
const controller = new TaskController();

// Joi Schemas
const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow('', null),
    category: Joi.string().max(50).required(),
    endDate: Joi.date().iso().required(),
    status: Joi.string().valid('pending', 'in-progress', 'done').required(),
  }),
};

const updateTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().max(500).allow('', null),
    category: Joi.string().max(50),
    dueDate: Joi.date().iso(),
    status: Joi.string().valid('pending', 'in-progress', 'done').required(),
  }),
};

const idParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

const collaboratorSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

// Middleware de autenticação
router.use(isAuthenticated);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finalizar projeto
 *               description:
 *                 type: string
 *                 example: Criar todas as funcionalidades restantes
 *               category:
 *                 type: string
 *                 example: Trabalho
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-30
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, done]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */
router.post('/', celebrate(createTaskSchema), controller.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas do usuário logado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 */
router.get('/', controller.listUserTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', celebrate(idParamSchema), controller.findById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Título atualizado
 *               description:
 *                 type: string
 *                 example: Descrição atualizada
 *               category:
 *                 type: string
 *                 example: Estudo
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-01
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, done]
 *                 example: in-progress
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', celebrate({ ...idParamSchema, ...updateTaskSchema }), controller.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', celebrate(idParamSchema), controller.delete);

/**
 * @swagger
 * /tasks/{id}/collaborators:
 *   post:
 *     summary: Adiciona um colaborador à tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: colaborador@email.com
 *     responses:
 *       200:
 *         description: Colaborador adicionado com sucesso
 *       404:
 *         description: Tarefa ou colaborador não encontrado
 */
router.post('/:id/collaborators', celebrate(collaboratorSchema), controller.addCollaborator);

 /**
 * @swagger
 * /tasks/{id}/collaborators:
 *   delete:
 *     summary: Remove um colaborador da tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da tarefa
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Colaborador removido com sucesso
 *       404:
 *         description: Tarefa ou colaborador não encontrado
 */
router.delete('/:id/collaborators', celebrate(idParamSchema), controller.removeCollaborator);

export { router as taskRouter };