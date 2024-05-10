import controllerUser from '../controllers/userController.js'
import controllerPaciente from '../controllers/pacienteControler.js'

export default app  => {
    app.route('/api/v1/signUpPaciente').post(controllerPaciente().signUpPaciente)
    app.route('/api/v1/login').post(controllerUser().loginController)
}