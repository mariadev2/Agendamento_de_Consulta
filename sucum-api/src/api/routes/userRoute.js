import controllerUser from '../controllers/userController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../../../swaggerConfig.js'

export default app  => {
    app.route('/api/v1/login').post(controllerUser().loginController);
}