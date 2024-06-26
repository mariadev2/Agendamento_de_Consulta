import controllerPaciente from '../controllers/pacienteController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'


export default app  => {
/**
 * @swagger
 * /api/v1/signUpPaciente:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Paciente
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                paciente:
 *                  type: object
 *                  properties:
 *                     username:
 *                       type: string
 *                     senha:
 *                       type: string
 *                     dataNascimento:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cep:
 *                       type: string
 *                     celular:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     cpf:
 *                       type: string
 *                     numeroCasa:
 *                       type: number
 *                     email:
 *                       type: string
 *                questionario:
 *                  type: object
 *                  properties:
 *                    problemaSaude:
 *                      type: string
 *                    usoMedicamento:
 *                      type: string
 *                    alergia:
 *                      type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/signUpPaciente').post(controllerPaciente().signUpPaciente);

/**
 * @swagger
 * /api/v1/updatePaciente:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Paciente
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                paciente:
 *                  type: object
 *                  properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *                     senha:
 *                       type: string
 *                     dataNascimento:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cep:
 *                       type: string
 *                     celular:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     cpf:
 *                       type: string
 *                     numeroCasa:
 *                       type: number
 *                     email:
 *                       type: string
 *                questionario:
 *                  type: object
 *                  properties:
 *                    problemaSaude:
 *                      type: string
 *                    usoMedicamento:
 *                      type: string
 *                    alergia:
 *                      type: string
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/updatePaciente').post(controllerPaciente().updatePaciente);
/**
 * @swagger
 * /api/v1/deletePaciente:
 *   delete:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Paciente
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
    app.route('/api/v1/deletePaciente').delete(controllerPaciente().deletePaciente);
/**
 * @swagger
 * /api/v1/getAllPacientes:
 *   get:
 *     description: Retorna uma lista de pacientes
 *     tags:
 *      - Paciente
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/getAllPacientes').get(controllerPaciente().getAllPacientes);
/**
 * @swagger
 * /api/v1/getPacienteById:
 *   post:
 *     description: Retorna os dados do paciente
 *     tags:
 *      - Paciente
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
    app.route('/api/v1/getPacienteById').post(controllerPaciente().getPacienteById);
}