
import jwt from 'jsonwebtoken'
import db from '../../database/config-database.js'
import dotenv from 'dotenv'
import {checkUserExistLogin} from '../../database/utils.js'



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
                        if ((element.username === username || element.cpf === username ) && element.senha === senha) {
                            const token = jwt.sign({ userId: element.id}, secretKey, {
                                expiresIn: '1h',
                            });
                           return res.status(200).json({tokenJWT: token, 
                                                        id: result[0].id, 
                                                        username: result[0].username, 
                                                        perfil: result[0].perfil, 
                                                        sexo: result[0].sexo
                                                       });
                        }else{
                            return res.status(401).json({message: "Senha inválida"});
                        }
                    });
                }else{
                    return res.status(401).json({message: "Username is not exists"});
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Login error' });
        }
    };
  
    return controller;
  }