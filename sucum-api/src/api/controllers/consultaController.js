
import db from '../../database/config-database.js'
import dotenv from 'dotenv'
import jwtValidate from '../../config/jwt_validate.js'
import Consulta from '../models/consulta.js'
import { createSqlInsertConsulta, checkConsultaExist, queryDeleteConsulta, queryUpdateConsulta, checkConsultaExistById, queryGetAllConsultas, queryGetConsultaById } from '../../database/consulta/consulta-util.js'
import { queryGetPacienteById } from '../../database/paciente/paciente-utils.js'
import { queryGetMedicoById } from '../../database/medico/medico-utils.js'



export default () => {
    dotenv.config()
    const controller = {};
    const getInstanceDB = db();

    controller.signUpConsulta = async (req, res) => {
        const newConsulta = returnNewConsulta(req.body)
        const queryConsultaExist = checkConsultaExist(newConsulta.descricaoMotivo)

        const querySave = createSqlInsertConsulta(newConsulta)
        try {
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryConsultaExist, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Error sql: ' + err.sqlMessage});
                    if (data[0].count > 0 ) {
                        return res.status(200).json({message: "Já existe uma consulta em andamento com esse motivo"});
                    }else{
                        getInstanceDB.query(querySave, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                            return res.status(200).json({message: "Salvo com sucesso"});
                        })
                    }  
                });
            }).catch(e => res.status(401).json({message: "Unauthorized"}))
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"})
        }    
    };

    controller.deleteConsulta = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;

        const queryDelete = queryDeleteConsulta(id);
        getInstanceDB.query(queryDelete, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
            return res.status(200).json({message: "Delete success"}); 
        })
    };

    controller.updateConsulta = async (req, res) => {
        const getInstanceDB = db();
        const newConsulta = returnNewConsulta(req.body)

        try {
            const queryConsultaExist = checkConsultaExistById(newConsulta.id)
            const queryUpdate = queryUpdateConsulta(newConsulta);
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryConsultaExist, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Upload failed: ' + err.sqlMessage});
                    
                    if (data[0].count > 0 ) {
                        getInstanceDB.query(queryUpdate, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                            return res.status(200).json({message: "Edited success"});
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

    controller.getAllConsultas = async (req, res) => {
        const getInstanceDB = db();
        try {
            const queryGet = queryGetAllConsultas();
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
    
    controller.getConsultaById = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;
        let returnConsulta = {
            "consulta": {},
            "paciente": {},
            "medico": {}
        }
        try {
            const queryGet = queryGetConsultaById(id);
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            jwtValidate(getToken).then(e => {
                 getInstanceDB.query(queryGet, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Get failed: ' + err.sqlMessage});
                    console.log(err);
                    const result = Object.values(JSON.parse(JSON.stringify(data)));
                
                    if (result.length > 0) {
                        const queryGetPaciente = queryGetPacienteById(result[0].idPaciente);
                        const queryGetMedico = queryGetMedicoById(result[0].idMedico);
                        returnConsulta.consulta = result[0]
                        getInstanceDB.query(queryGetPaciente, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
                            const result = Object.values(JSON.parse(JSON.stringify(data)));
                            if (result.length > 0) {
                                returnConsulta.paciente = result[0]
                            }else{
                                res.status(400).json({messageError: 'Usuario is not exist'});
                            }
                        });
                        getInstanceDB.query(queryGetMedico, (err, data)=>{
                            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
                            const result = Object.values(JSON.parse(JSON.stringify(data)));
                            
                            if (result.length > 0) {
                                returnConsulta.medico = result[0]
                            }else{
                                res.status(400).json({messageError: 'Medico is not exist'});
                            }
                            return res.status(200).json({returnConsulta});
                        });
                    }else{
                        res.status(400).json({messageError: 'Consulta is not exist'});
                    }
                })
            }).catch(e => res.status(401).json({message: "Unauthorized"}));
        } catch (error) {
           return res.status(401).json({message: "Unauthorized"})
        }

    }
    return controller;
  }

  function returnNewConsulta(data) {
    const getDate = new Date().toISOString();
    const consulta = new Consulta({
        id: data.id,
        tipoConsulta: data.tipoConsulta,
        descricaoConsulta: data.descricaoConsulta,
        estadoConsulta: data.estadoConsulta,
        descricaoMotivo: data.descricaoMotivo,
        idMedico: data.idMedico,
        idPaciente: data.idPaciente,
        dataAgendamento: data.dataAgendamento,
        createTime: getDate,
    });

    return consulta; 
}