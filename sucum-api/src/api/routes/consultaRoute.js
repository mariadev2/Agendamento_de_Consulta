import controllerConsulta from '../controllers/consultaController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'

export default app  => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /api/v1/signUpConsulta:
 *   post:
 *     description: Retorna uma mensagem contendo o status da requisição
 *     tags:
 *      - Consulta
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                tipoConsulta:
 *                  type: string
 *                descricaoConsulta:
 *                   type: string
 *                estadoConsulta:
 *                   type: string
 *                descricaoMotivo:
 *                   type: string
 *                dataAgendamento:
 *                   type: string
 *                idPaciente:
 *                   type: number
 *                idMedico:
 *                   type: number
 *     responses:
 *       200:
 *         description: String
 */
    app.route('/api/v1/signUpConsulta').post(controllerConsulta().signUpConsulta);
}