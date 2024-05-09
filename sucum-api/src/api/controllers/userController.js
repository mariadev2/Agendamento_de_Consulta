
import jwt from 'jsonwebtoken'
import db from '../../database/config-database.js'
import dotenv from 'dotenv'
import {checkUserExistLogin} from '../../database/utils.js'
import jwtValidate from '../../config/jwt_validate.js'



export default () => {
    dotenv.config()
    const controller = {};
    const secretKey = process.env.SECRET_KEY;
    const getInstanceDB = db();

    controller.loginController = async (req, res) => {
        try {
            const { username, senha } = req.body;
            const queryLogin = checkUserExistLogin(username)

            getInstanceDB.query(queryLogin, (err, data)=>{
                if (err) res.status(500).json({messageError: 'Error sql: ' + err.sqlMessage});
                const result = Object.values(JSON.parse(JSON.stringify(data)));

                if (result.length > 0) {
                    result.forEach(element => {
                        if (element.username === username && element.senha === senha) {
                            const token = jwt.sign({ userId: element.id}, secretKey, {
                                expiresIn: '10',
                            });
                            return res.status(200).json({tokenJWT: token});
                        }
                    });
                }else{
                    return res.status(401).json({message: "Username is not exists"});
                }
            })
           
         //jwtValidate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE3MTUyMTgyODgsImV4cCI6MTcxNTIxODI4OH0.7g8z6LQMc1S35IvuQ_3AM4eiFlx0_3x6ndshZfgxtzc").then(e => e).catch(e => res.status(401).json({message: "Unauthorized"}))
            
        } catch (error) {
            res.status(500).json({ error: 'Login error' });
        }
    };
  
    return controller;
  }