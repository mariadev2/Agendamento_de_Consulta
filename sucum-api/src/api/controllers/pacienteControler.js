
import bcrypt from 'bcrypt'
import criarSQLInsercao from '../../database/utils.js'
import db from '../../database/config-database.js'
import Paciente from '../models/paciente.js';


export default () => {
    const controller = {};
    controller.signUpController = async (req, res) => {

        const getInstanceDB = db();
        try {
            const {username, bairro, celular, cidade, cpf, dataNascimento, numeroCasa, password, email, createTime, cep } = req.body;
            const hashedToken = await bcrypt.hash(password, 10);
            const paciente = new Paciente({
                username: username ?? null, 
                password: password ?? null, 
                token: hashedToken ?? null,
                bairro: bairro ?? null, 
                celular: celular ?? null, 
                cidade: cidade ?? null, 
                cpf: cpf ?? null, 
                dataNascimento: dataNascimento ?? null, 
                email: email ?? null, 
                numeroCasa: numeroCasa ?? null, 
                cep: cep ?? null,
                createTime: createTime ?? null
            });
            const querySaveAccount = createSqlInsertPaciente("paciente", paciente)
            
            getInstanceDB.query(querySaveAccount, (err, data)=>{
                if (err) res.status(500).json({messageError: err.sqlMessage});
                return res.status(200).json({message: "Salvo com sucesso"});
            })

        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    };

    return controller;
}