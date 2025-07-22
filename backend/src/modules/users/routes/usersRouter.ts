import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../middlewares/isAuthenticated';
import { UsersController } from '../controllers/UsersController';

const router = Router();
const controller = new UsersController();



// Schema para updateUser
const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  }).min(1) // Pelo menos um campo deve estar presente
};


/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', isAuthenticated, controller.getProfile);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               password:
 *                 type: string
 *                 example: "novaSenhaSegura123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.put('/update', isAuthenticated, celebrate(updateUserSchema), controller.updateUser);

export { router as usersRouter };