export function createSqlInsertQuestionario(dados, id) {
    return `INSERT INTO questionario (idPaciente, createTime, problemaSaude, usoMedicamento, 
                                        alergia)
                        VALUES (${id},"${dados.createTime}","${dados.problemaSaude}","${dados.usoMedicamento}","${dados.alergia}");`;
    
}

export function createSqlUpdatePacienteQuestionario(id) {
    console.log(id);
    return `UPDATE paciente
             SET idQuestionario = ${id}
             WHERE id = ${id};`
}

export function createSqlUpdateQuestionario(dados, id) {
    return `UPDATE questionario
            SET problemaSaude = "${dados.problemaSaude}",
                usoMedicamento = "${dados.usoMedicamento}",
                alergia = "${dados.alergia}"
            WHERE idPaciente = ${id};`;
}

export function deleteQuestionario(id) {
    return `DELETE FROM questionario
            WHERE idPaciente = ${id}`
}