import controller from '../controllers/userController.js'

export default app  => {
    app.route('/api/v1/signUp').post(controller().signUpController)
    app.route('/api/v1/login').post(controller().loginController)
}