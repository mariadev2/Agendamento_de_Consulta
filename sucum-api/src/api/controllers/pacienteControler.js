
import bcrypt from 'bcrypt'
import db from '../../database/config-database.js'
import Paciente from '../models/paciente.js';
import {createSqlInsertPaciente, checkUserExistPaciente}  from '../../database/utils.js'

export default () => {
    const controller = {};
    controller.signUpController = async (req, res) => {
        const getInstanceDB = db();
        const getDate = new Date().toISOString();
        const {username, bairro, celular, cidade, cpf, dataNascimento, numeroCasa, senha, email, cep } = req.body;
        let hashedToken  = "";
        try {
            hashedToken = await bcrypt.hash(senha, 10);
        } catch (error) {
            res.status(500).json({messageError: 'Password Invalid'});
        }
        const paciente = new Paciente({
                username: username ?? null, 
                senha: senha ?? null, 
                token: hashedToken ?? null,
                bairro: bairro ?? null, 
                celular: celular ?? null, 
                cidade: cidade ?? null, 
                cpf: cpf ?? null, 
                dataNascimento: dataNascimento ?? null, 
                email: email ?? null, 
                numeroCasa: numeroCasa ?? null, 
                cep: cep ?? null,
                createTime: getDate
            });
          
        const querySaveAccount = createSqlInsertPaciente(paciente)
        const queryCheckExist = checkUserExistPaciente(paciente.username)
     
        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});

            if (data[0].count > 0 ) {
                return res.status(200).json({message: "Já existe um paciente com esse nome"});
            }else{
                getInstanceDB.query(querySaveAccount, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                    return res.status(200).json({message: "Salvo com sucesso"});
                })
            }         
        })
    };

    return controller;
}