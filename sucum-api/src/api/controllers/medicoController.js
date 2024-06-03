
import db from '../../database/config-database.js'
import Medico from '../models/medico.js';
import PreMedico from '../models/preMedico.js';
import { createSqlInsertPreMedico,
        checkUserExistMedico, 
        checkUserExistMedicoById, 
        queryUpdateMedico,
        queryDeleteMedico,
        queryGetAllMedicos,
        queryGetMedicoById
        }  from '../../database/medico/medico-utils.js'
import jwtValidate from '../../config/jwt_validate.js'

export default () => {
    const controller = {};

    controller.getMedicoById = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;
        try {
        let getToken = req.headers['authorization'];
        if (getToken != undefined) {
            getToken = getToken.replace('Bearer', '').trim();
        }
        const queryGet = queryGetMedicoById(id);
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

    controller.preSignUpMedico = async (req, res) => {
        const getInstanceDB = db();
        const preMedicoNew = returnNewPreMedico(req.body)
          
        const querySaveAccount = createSqlInsertPreMedico(preMedicoNew)
        const queryCheckExist = checkUserExistMedico(preMedicoNew.username)
     
        getInstanceDB.query(queryCheckExist, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
           
            if (data[0].count > 0 ) {
                return res.status(400).json({message: "Já existe um Medico com esse nome"});
            }else{
                getInstanceDB.query(querySaveAccount, (err, data)=>{
                    console.log(err);
                    if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                    return res.status(200).json({message: "Salvo com sucesso"});
                })
            }         
        })
    };

    controller.signUpMedico = async (req, res) => {
        const getInstanceDB = db();
        const MedicoNew = returnNewMedico(req.body)
        const queryUpdateAccount = queryUpdateMedico(MedicoNew)
        const queryCheckExist = checkUserExistMedico(MedicoNew.username)
        let getToken = req.headers['authorization'];
        if (getToken != undefined) {
            getToken = getToken.replace('Bearer', '').trim();
        }

        jwtValidate(getToken).then(e => {
            getInstanceDB.query(queryCheckExist, (err, data)=>{
                if (err) res.status(500).json({messageError: 'Registration failed: ' + err.sqlMessage});
                if (data[0].count > 0 ) {
                    getInstanceDB.query(queryUpdateAccount, (err, data)=>{
                        if (err) res.status(500).json({messageError: 'Registration failed' + err.sqlMessage});
                        return res.status(200).json({message: "Salvo com sucesso"});
                    })  
                }else{
                    return res.status(400).json({message: "Not exist medico with this name"});
                }
            })
        }).catch(e => res.status(401).json({message: "Unauthorized"}));
    };

    controller.updateMedico = async (req, res) => {
        const getInstanceDB = db();
        const MedicoNew = returnNewMedico(req.body)

        try {
            const queryCheckExist = checkUserExistMedicoById(MedicoNew.id);
            const queryUpdate = queryUpdateMedico(MedicoNew);
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
                        res.status(400).json({messageError: 'Update failed: id not exist'});
                    }    
                })
            }).catch(e => res.status(401).json({message: "Unauthorized"}))
        } catch (error) {
            return res.status(401).json({message: "Unauthorized"})
        }
        
    };

    controller.deleteMedico = async (req, res) => {
        const getInstanceDB = db();
        const {id} = req.body;

        const queryDelete = queryDeleteMedico(id);
        getInstanceDB.query(queryDelete, (err, data)=>{
            if (err) res.status(500).json({messageError: 'Delete failed: ' + err.sqlMessage});
            return res.status(200).json({message: "Delete success"}); 
        })
    }

    controller.getAllMedicos = async (req, res) => {
        const getInstanceDB = db();
        try {
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            const queryGet = queryGetAllMedicos();
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

function returnNewMedico(data) {
    const getDate = new Date().toISOString();
    const medico = new Medico({
        id: data.id ?? null,
        bairro: data.bairro ?? null, 
        celular: data.celular ?? null, 
        cidade: data.cidade ?? null, 
        dataNascimento: data.dataNascimento ?? null, 
        email: data.email ?? null, 
        numeroCasa: data.numeroCasa ?? null, 
        cep: data.cep ?? null,
        especializacao: data.especializacao ?? null,
        genero: data.genero,
        createTime: getDate
    });

    return medico; 
}

function returnNewPreMedico(data) {
    const getDate = new Date().toISOString();
    const preMedico = new PreMedico({
        username: data.username ?? null, 
        senha: data.senha ?? null, 
        crm: data.crm ?? null, 
        cpf: data.cpf ?? null,
        isActive: 'false',
        createTime: getDate
    });

    return preMedico; 
}