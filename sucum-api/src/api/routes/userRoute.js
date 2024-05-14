import controllerUser from '../controllers/userController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'

export default app  => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     description: Retorna token jwt de sessao do usuário
 *     tags:
 *      - Login
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                   type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/login').post(controllerUser().loginController);
}