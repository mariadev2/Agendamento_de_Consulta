
import db from '../../database/config-database.js'
import Paciente from '../models/paciente.js';
import {createSqlInsertPaciente, 
        checkUserExistPaciente, 
        checkUserExistPacienteById, 
        queryUpdatePaciente,
        queryDeletePaciente,
        queryGetAllPacientes,
        queryGetPacienteById,
        queryGetPacienteByUsername
        }  from '../../database/paciente/paciente-utils.js'
import jwtValidate from '../../config/jwt_validate.js'
import {createSqlInsertQuestionario,
        createSqlUpdatePacienteQuestionario, 
        createSqlUpdateQuestionario,
        deleteQuestionario } from '../../database/questionario/questionario-utils.js';
import Questionario from '../models/questionario.js';

export default () => {
    const controller = {};
    
    controller.getPacienteById = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;
        try {
            let getToken = req.headers['authorization'];
        if (getToken != undefined) {
            getToken = getToken.replace('Bearer', '').trim();
        }
        const queryGet = queryGetPacienteById(id);
        jwtValidate(getToken).then(e => {
            getInstanceDB.query(queryGet, (err, data)=>{
                if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
                if (data.length > 0) {
                    const result = Object.values(JSON.parse(JSON.stringify(data)));
                    return res.status(200).json({data: result});
                }else{
                    res.status(400).json({messageError: 'Usuario is not exist'});
                }
            })
        }).catch(e => res.status(401).json({message: "Unauthorized"}))
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"})
        }
    }

    controller.signUpPaciente = async (req, res) => {
        const getInstanceDB = db();
        const pacienteNew = returnNewPaciente(req.body.paciente);
        const questionarioNew = returnNewQuestionario(req.body.questionario);
          
        const querySaveAccount = createSqlInsertPaciente(pacienteNew);
        const queryCheckExist = checkUserExistPaciente(pacienteNew.username);
        const queryCheckExistPaciente = queryGetPacienteByUsername(pacienteNew.username);
     
        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});

            if (data[0].count > 0 ) {
                return res.status(200).json({message: "Já existe um paciente com esse nome"});
            }else{
                getInstanceDB.query(querySaveAccount, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
                        getInstanceDB.query(queryCheckExistPaciente, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Sql error: ' + err.sqlMessage});
                            const result = Object.values(JSON.parse(JSON.stringify(data)));
                            const querySaveQuestionario = createSqlInsertQuestionario(questionarioNew, result[0].id)
                            const queryUpdatePaciente = createSqlUpdatePacienteQuestionario(result[0].id)
                            getInstanceDB.query(querySaveQuestionario, (err, data)=>{
                                if (err) res.status(500).json({messageError: 'Sql error: ' + err.sqlMessage});
                                getInstanceDB.query(queryUpdatePaciente, (err, data)=>{
                                    if (err) res.status(500).json({messageError: 'Sql error: ' + err.sqlMessage});
                                    return res.status(200).json({message: "Successs"});
                                })
                            })
                        })
                })
            }         
        })
    };

    controller.updatePaciente = async (req, res) => {
        const getInstanceDB = db();
        const pacienteNew = returnNewPaciente(req.body.paciente)
        const questionarioNew = returnNewQuestionario(req.body.questionario);
        try {
            const queryCheckExist = checkUserExistPacienteById(pacienteNew.id);
            const queryUpdate = queryUpdatePaciente(pacienteNew);
            const queryUpdateQuestionario =  createSqlUpdateQuestionario(questionarioNew, pacienteNew.id)
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryCheckExist, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Upload failed: ' + err.sqlMessage});
                    if (data.length > 0) {
                        getInstanceDB.query(queryUpdate, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                            getInstanceDB.query(queryUpdateQuestionario, (err, data)=>{
                                if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                                return res.status(200).json({message: "Edited success"});
                            })  
                        })
                    }else{
                        res.status(400).json({messageError: 'Update failed: id not exist'});
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
        const queryCheckExist = checkUserExistPacienteById(id);
        const queryDeleteQuestionario = deleteQuestionario(id)
        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (data.length > 0) {
                if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
                getInstanceDB.query(queryDelete, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
                    getInstanceDB.query(queryDeleteQuestionario, (err, data)=>{
                        if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
                        return res.status(200).json({message: "Delete success"}); 
                    })
                })
            }else{
                res.status(400).json({messageError: 'Delete failed: id not exist'});
            } 
        })
        
    }

    controller.getAllPacientes = async (req, res) => {
        const getInstanceDB = db();
        try {
            const queryGet = queryGetAllPacientes();
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
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
        genero: data.genero,
        createTime: getDate
    });

    return paciente; 
}

function returnNewQuestionario(data) {
    const getDate = new Date().toISOString();
    const questionario = new Questionario({
        createTime: getDate,
        problemaSaude: data.problemaSaude ?? null,
        usoMedicamento: data.usoMedicamento ?? null,
        alergia: data.alergia ?? null
    });

    return questionario; 
}