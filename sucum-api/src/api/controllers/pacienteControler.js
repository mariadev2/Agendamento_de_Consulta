
import db from '../../database/config-database.js'
import Paciente from '../models/paciente.js';
import {createSqlInsertPaciente, 
        checkUserExistPaciente, 
        checkUserExistPacienteById, 
        queryUpdatePaciente,
        queryDeletePaciente,
        queryGetAllPacientes
        }  from '../../database/paciente/paciente-utils.js'
import jwtValidate from '../../config/jwt_validate.js'

export default () => {
    const controller = {};

    controller.signUpPaciente = async (req, res) => {
        const getInstanceDB = db();
        const pacienteNew = returnNewPaciente(req.body)
          
        const querySaveAccount = createSqlInsertPaciente(pacienteNew)
        const queryCheckExist = checkUserExistPaciente(pacienteNew.username)
     
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

    controller.updatePaciente = async (req, res) => {
        const getInstanceDB = db();
        const pacienteNew = returnNewPaciente(req.body)
        try {
            const getToken = req.headers['authorization'].replace('Bearer', '').trim();
            const queryCheckExist = checkUserExistPacienteById(pacienteNew.id);
            const queryUpdate = queryUpdatePaciente(pacienteNew);
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryCheckExist, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Upload failed: ' + err.sqlMessage});
                    if (data != null) {
                        getInstanceDB.query(queryUpdate, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                            return res.status(200).json({message: "Edited success"});
                        })
                    }     
                })
            }).catch(e => res.status(401).json({message: "Unauthorized"}))
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"})
        }
        
    };

    controller.deletePaciente = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;

        const queryDelete = queryDeletePaciente(id);
        getInstanceDB.query(queryDelete, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
            return res.status(200).json({message: "Delete success"}); 
        })
    }

    controller.getAllPacientes = async (req, res) => {
        const getInstanceDB = db();
        try {
            const getToken = req.headers['authorization'].replace('Bearer', '').trim();
            const queryGet = queryGetAllPacientes();
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryGet, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Get failed: ' + err.sqlMessage});
                    const result = Object.values(JSON.parse(JSON.stringify(data)));
                    return res.status(200).json({content: result}); 
                })
            }).catch(e => res.status(401).json({message: "Unauthorized"}));
        } catch (error) {
           return res.status(401).json({message: "Unauthorized"})
        }
        
    }

    return controller;
}

function returnNewPaciente(data) {
    const getDate = new Date().toISOString();
    const paciente = new Paciente({
        id: data.id ?? null,
        username: data.username ?? null, 
        senha: data.senha ?? null, 
        bairro: data.bairro ?? null, 
        celular: data.celular ?? null, 
        cidade: data.cidade ?? null, 
        cpf: data.cpf ?? null, 
        dataNascimento: data.dataNascimento ?? null, 
        email: data.email ?? null, 
        numeroCasa: data.numeroCasa ?? null, 
        cep: data.cep ?? null,
        createTime: getDate
    });

    return paciente; 
}