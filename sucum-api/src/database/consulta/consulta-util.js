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
            WHERE descricaoConsulta = "${descricaoConsulta}"
            `
}