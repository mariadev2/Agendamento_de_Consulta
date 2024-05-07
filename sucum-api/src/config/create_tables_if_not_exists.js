import db from '../database/config-database.js'
import {queryCreatePacienteTable, 
        queryCreateSupervisorTable, 
        queryCreateMedicoTable, 
        queryCreateConsultaTable} from '../database/utils.js'

export default () => {
    const getInstanceDB = db();
    const queryPaciente = queryCreatePacienteTable();
    const querySupervisor = queryCreateSupervisorTable();
    const queryMedico = queryCreateMedicoTable();
    const queryConsulta = queryCreateConsultaTable();

    // SQL query to create table if it doesn't exist
    getInstanceDB.connect((err) => {
        if (err) throw err;
        console.log('Conectado no MySQL database');
    });
   
    getInstanceDB.query(queryPaciente, (err, result) => {
        if (err) throw err;
        console.log('Table paciente created or already exists');
    });

    getInstanceDB.query(querySupervisor, (err, result) => {
        if (err) throw err;
        console.log('Table supervisor created or already exists');
    });

    getInstanceDB.query(queryMedico, (err, result) => {
        if (err) throw err;
        console.log('Table medico created or already exists');
    });

    getInstanceDB.query(queryConsulta, (err, result) => {
        if (err) throw err;
        console.log('Table consulta created or already exists');
    });

    // Close the connection
    getInstanceDB.end();
}