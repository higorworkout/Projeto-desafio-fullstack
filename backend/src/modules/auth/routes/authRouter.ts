import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthController } from '../controllers/AuthController';
import isAuthenticated from 'src/middlewares/isAuthenticated';

const router = Router();
const controller = new AuthController();

// Schema para signup
const signupSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
};

// Schema para signin
const signinSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
};



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *               name:
 *                 type: string
 *                 example: João Silva
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/signup', celebrate(signupSchema), controller.signup);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/signin', celebrate(signinSchema), controller.signin);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *                 name:
 *                   type: string
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/me', isAuthenticated, controller.getCurrentUser)

export { router as authRouter };


