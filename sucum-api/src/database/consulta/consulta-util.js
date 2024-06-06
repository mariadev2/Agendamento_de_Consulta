export function createSqlInsertConsulta(dados) {
    return `INSERT INTO consulta (createTime, tipoConsulta, descricaoConsulta, 
                                  estadoConsulta, descricaoMotivo, dataAgendamento, 
                                  idPaciente, idMedico) 
                        VALUES ("${dados.createTime}","${dados.tipoConsulta}","${dados.descricaoConsulta}",
                                "${dados.estadoConsulta}", "${dados.descricaoMotivo}", "${dados.dataAgendamento}", 
                                "${dados.idPaciente}", "${dados.idMedico}");`;
    
}

export function checkConsultaExist(descricaoConsulta){
    return `SELECT COUNT(*) AS count
            FROM consulta
            WHERE descricaoMotivo = "${descricaoConsulta}"
            `
}

export function checkConsultaExistById(id){
    return `SELECT COUNT(*) AS count
            FROM consulta
            WHERE id = ${id}
            `
}

export function queryDeleteConsulta(id){
    return `DELETE FROM consulta
            WHERE id = ${id}`
}

export function queryUpdateConsulta(dados){
    return `UPDATE consulta
            SET estadoConsulta = "${dados.estadoConsulta}",
                descricaoConsulta = "${dados.descricaoConsulta}"
            WHERE id = ${dados.id};`;
}

export function queryGetAllConsultas(){
    return `SELECT * FROM consulta`
}

export function queryGetConsultaById(id){
    return `SELECT *
    FROM consulta
    WHERE id =${id}`
}