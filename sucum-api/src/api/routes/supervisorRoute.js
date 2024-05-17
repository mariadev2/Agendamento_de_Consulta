import controllerSupervisor from '../controllers/supervisorController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'


export default app  => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
/**
 * @swagger
 * /api/v1/signUpSupervisor:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Supervisor
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                senha:
 *                   type: string
 *                areaSupervisao:
 *                   type: string
 *                email:
 *                   type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/signUpSupervisor').post(controllerSupervisor().signUpSupervisor);

/**
 * @swagger
 * /api/v1/updateSupervisor:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Supervisor
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                username:
 *                  type: string
 *                senha:
 *                   type: string
 *                areaSupervisao:
 *                   type: string
 *                email:
 *                   type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/updateSupervisor').post(controllerSupervisor().updateSupervisor);
/**
 * @swagger
 * /api/v1/deleteSupervisor:
 *   delete:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Supervisor
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/deleteSupervisor').delete(controllerSupervisor().deleteSupervisor);
/**
 * @swagger
 * /api/v1/getAllSupervisor:
 *   get:
 *     description: Retorna uma lista de Supervisors
 *     tags:
 *      - Supervisor
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/getAllSupervisor').get(controllerSupervisor().getAllSupervisors);
/**
 * @swagger
 * /api/v1/getSupervisorById:
 *   post:
 *     description: Retorna os dados do paciente
 *     tags:
 *      - Supervisor
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *     responses:
 *       200:
 *         description: String
 */
app.route('/api/v1/getSupervisorById').post(controllerSupervisor().getSupervisorById);
}