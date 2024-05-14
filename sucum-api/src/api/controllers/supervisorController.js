
import db from '../../database/config-database.js'
import Supervisor from '../models/supervisor.js';
import {createSqlInsertSupervisor, 
        checkUserExistSupervisor, 
        checkUserExistSupervisorById, 
        queryUpdateSupervisor,
        queryDeleteSupervisor,
        queryGetAllSupervisors,
        queryGetSupervisorById
        }  from '../../database/supervisor/supervisor-utils.js'
import jwtValidate from '../../config/jwt_validate.js'

export default () => {
    const controller = {};

    controller.getSupervisorById = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;
        try {
            let getToken = req.headers['authorization'];
        if (getToken != undefined) {
            getToken = getToken.replace('Bearer', '').trim();
        }
        const queryGet = queryGetSupervisorById(id);
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

    controller.signUpSupervisor = async (req, res) => {
        const getInstanceDB = db();
        const supervisorNew = returnNewSupervisor(req.body)
          
        const querySaveAccount = createSqlInsertSupervisor(supervisorNew)
        const queryCheckExist = checkUserExistSupervisor(supervisorNew.username)
     
        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});

            if (data[0].count > 0 ) {
                return res.status(200).json({message: "Já existe um supervisor com esse nome"});
            }else{
                getInstanceDB.query(querySaveAccount, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                    return res.status(200).json({message: "Salvo com sucesso"});
                })
            }         
        })
    };

    controller.updateSupervisor = async (req, res) => {
        const getInstanceDB = db();
        const supervisorNew = returnNewSupervisor(req.body)

        try {
            const queryCheckExist = checkUserExistSupervisorById(supervisorNew.id);
            const queryUpdate = queryUpdateSupervisor(supervisorNew);
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
                            return res.status(200).json({message: "Edited success"});
                        })
                    }else{
                        res.status(400).json({messageError: 'Upload failed: id not exist'});
                    }    
                })
            }).catch(e => res.status(401).json({message: "Unauthorized"}))
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"})
        }
        
    };

    controller.deleteSupervisor = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;

        const queryDelete = queryDeleteSupervisor(id);
        getInstanceDB.query(queryDelete, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
            return res.status(200).json({message: "Delete success"}); 
        })
    }

    controller.getAllSupervisors = async (req, res) => {
        const getInstanceDB = db();
        try {
            const queryGet = queryGetAllSupervisors();
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

function returnNewSupervisor(data) {
    const getDate = new Date().toISOString();
    const supervisor = new Supervisor({
        id: data.id ?? null,
        username: data.username ?? null, 
        senha: data.senha ?? null, 
        email: data.email ?? null, 
        areaSupervisao: data.areaSupervisao ?? null,
        createTime: getDate
    });

    return supervisor; 
}