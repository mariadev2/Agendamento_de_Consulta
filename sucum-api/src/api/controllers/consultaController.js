
import db from '../../database/config-database.js'
import dotenv from 'dotenv'
import jwtValidate from '../../config/jwt_validate.js'
import Consulta from '../models/consulta.js'
import { createSqlInsertConsulta, checkConsultaExist } from '../../database/consulta/consulta-util.js'



export default () => {
    dotenv.config()
    const controller = {};
    const getInstanceDB = db();

    controller.signUpConsulta = async (req, res) => {
        const newConsulta = returnNewConsulta(req.body)
        const queryConsultaExist = checkConsultaExist(newConsulta.descricaoConsulta)

        const querySave = createSqlInsertConsulta(newConsulta)
        try {
            let getToken = req.headers['authorization'];
            if (getToken != undefined) {
                getToken = getToken.replace('Bearer', '').trim();
            }
            jwtValidate(getToken).then(e => {
                getInstanceDB.query(queryConsultaExist, (err, data)=>{
                    if (err) res.status(500).json({messageError: 'Error sql: ' + err.sqlMessage});
                    console.log(data);
    
                    if (data[0].count > 0 ) {
                        return res.status(200).json({message: "Já existe uma consulta em andamento com essa descricao"});
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
  
    return controller;
  }

  function returnNewConsulta(data) {
    const getDate = new Date().toISOString();
    const consulta = new Consulta({
        tipoConsulta: data.tipoConsulta,
        descricaoConsulta: data.descricaoConsulta,
        estadoConsulta: data.estadoConsulta,
        descricaoMotivo: data.descricaoMotivo,
        idMedico: data.idMedico,
        idPaciente: data.idPaciente,
        dataAgendamento: data.dataAgendamento,
        createTime: getDate
    });

    return consulta; 
}