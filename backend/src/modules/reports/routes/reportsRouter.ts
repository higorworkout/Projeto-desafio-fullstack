import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../middlewares/isAuthenticated';
import { ReportsController } from '../controllers/ReportsController';

const router = Router();
const controller = new ReportsController();

/**
 * @swagger
 * /reports/tasks/completed-by-user:
 *   get:
 *     summary: Retorna a contagem de tarefas concluídas por usuário
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista com contagem por usuário
 */
router.get(
  '/tasks/completed-by-user',
  controller.getCompletedTasksByUser.bind(controller)
);

/**
 * @swagger
 * /reports/tasks/by-status:
 *   get:
 *     summary: Retorna tarefas agrupadas por status
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista de tarefas agrupadas
 */
router.get(
  '/tasks/by-status',
  controller.getTasksByStatus.bind(controller)
);

/**
 * @swagger
 * /reports/users/activity:
 *   get:
 *     summary: Retorna atividade recente dos usuários
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista de atividades
 */
router.get(
  '/users/activity',
  controller.getUserActivity.bind(controller)
);

/**
 * @swagger
 * /reports/tasks/summary:
 *   get:
 *     summary: Retorna resumo geral de tarefas
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Resumo total
 */
router.get(
  '/tasks/summary',
  controller.getTaskSummary.bind(controller)
);

/**
 * @swagger
 * /reports/tasks/by-date:
 *   get:
 *     summary: Retorna tarefas entre duas datas
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de tarefas no intervalo
 *       400:
 *         description: Parâmetros inválidos
 */
router.get(
  '/tasks/by-date',
  celebrate({
    [Segments.QUERY]: Joi.object({
      start: Joi.date().required().iso().label('start date'),
      end: Joi.date().required().iso().label('end date'),
    }),
  }),
  controller.getTasksByDateRange.bind(controller)
);

/**
 * @swagger
 * /reports/export:
 *   post:
 *     summary: Gera um relatório em CSV ou PDF
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [csv, pdf]
 *     responses:
 *       200:
 *         description: Arquivo gerado
 *       400:
 *         description: Parâmetro inválido
 */
router.post(
  '/export',
  celebrate({
    [Segments.BODY]: Joi.object({
      type: Joi.string().valid('csv', 'pdf').required(),
    }),
  }),
  controller.exportReport.bind(controller)
);





export { router as reportsRouter };