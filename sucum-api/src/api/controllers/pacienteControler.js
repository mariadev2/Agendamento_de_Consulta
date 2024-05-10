
import bcrypt from 'bcrypt'
import db from '../../database/config-database.js'
import Paciente from '../models/paciente.js';
import {createSqlInsertPaciente, checkUserExistPaciente, checkUserExistPacienteById}  from '../../database/utils.js'

export default () => {
    const controller = {};
    controller.signUpPaciente = async (req, res) => {
        const getInstanceDB = db();
        const getDate = new Date().toISOString();
        const {username, bairro, celular, cidade, cpf, dataNascimento, numeroCasa, senha, email, cep } = req.body;
        
        const paciente = new Paciente({
                username: username ?? null, 
                senha: senha ?? null, 
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

    controller.updatePaciente = async (req, res) =>{
        const getInstanceDB = db();
        const getDate = new Date().toISOString();
        const {id, username, bairro, celular, cidade, cpf, dataNascimento, numeroCasa, senha, email, cep } = req.body;

        const paciente = new Paciente({
            id: id ?? null,
            username: username ?? null, 
            senha: senha ?? null, 
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

        const queryCheckExist = checkUserExistPacienteById(paciente.id)

        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Upload failed: ' + err.sqlMessage});

            if (data[0].count > 0 ) {
                return res.status(200).json({message: "Já existe um paciente com esse nome"});
            }else{
                getInstanceDB.query(querySaveAccount, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                    return res.status(200).json({message: "Salvo com sucesso"});
                })
            }         
        })
    }

    return controller;
}