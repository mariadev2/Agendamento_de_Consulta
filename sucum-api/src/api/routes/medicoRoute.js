import controllerMedico from '../controllers/medicoController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'


export default app  => {
/**
 * @swagger
 * /api/v1/preSignUpMedico:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Medico
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                username:
 *                   type: string
 *                senha:
 *                   type: string
 *                crm:
 *                   type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/preSignUpMedico').post(controllerMedico().preSignUpMedico);

/**
 * @swagger
 * /api/v1/signUpMedico:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Medico
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
 *                  type: string
 *                dataNascimento:
 *                  type: string
 *                bairro:
 *                  type: string
 *                cep:
 *                  type: string
 *                celular:
 *                  type: string
 *                cidade:
 *                  type: string
 *                cpf:
 *                  type: string
 *                numeroCasa:
 *                  type: number
 *                email:
 *                  type: string
 *                crm:
 *                  type: string
 *                especializacao:
 *                  type: string
 *     responses:
 *       200:
 *         description: String
 */
app.route('/api/v1/signUpMedico').post(controllerMedico().signUpMedico);

/**
 * @swagger
 * /api/v1/updateMedico:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Medico
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id:
 *                   type: number
 *                username:
 *                   type: string
 *                senha:
 *                   type: string
 *                dataNascimento:
 *                   type: string
 *                bairro:
 *                   type: string
 *                cep:
 *                   type: string
 *                celular:
 *                   type: string
 *                cidade:
 *                   type: string
 *                cpf:
 *                   type: string
 *                numeroCasa:
 *                   type: number
 *                email:
 *                   type: string
 *                crm:
 *                   type: string
 *                especializacao:
 *                   type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/updateMedico').post(controllerMedico().updateMedico);
/**
 * @swagger
 * /api/v1/deleteMedico:
 *   delete:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Medico
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
    app.route('/api/v1/deleteMedico').delete(controllerMedico().deleteMedico);
/**
 * @swagger
 * /api/v1/getAllMedicos:
 *   get:
 *     description: Retorna uma lista de Medicos
 *     tags:
 *      - Medico
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/getAllMedicos').get(controllerMedico().getAllMedicos);
/**
 * @swagger
 * /api/v1/getMedicoById:
 *   post:
 *     description: Retorna os dados do paciente
 *     tags:
 *      - Medico
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
    app.route('/api/v1/getMedicoById').post(controllerMedico().getMedicoById);
}