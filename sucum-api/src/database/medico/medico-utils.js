export function checkUserExistMedicoById(id){
    return `SELECT * FROM medico WHERE id = "${id}"`
}

export function checkUserExistMedico(username){
    return `SELECT COUNT(*) AS count
                FROM medico 
                WHERE username = "${username}"`
}

export function queryUpdateMedico(dados){
    return `UPDATE medico
            SET email = "${dados.email}",
                dataNascimento = "${dados.dataNascimento}",
                celular = "${dados.celular}",
                cep = "${dados.cep}",
                numeroCasa = "${dados.numeroCasa}",
                bairro = "${dados.bairro}",
                sexo = "${dados.sexo}",
                cidade = "${dados.cidade}",
                endereco = "${dados.endereco}",
                especializacao = "${dados.especializacao}",
                isActive = "${dados.isActive}"
            WHERE id = ${dados.id};`;
}


export function createSqlInsertPreMedico(dados) {
    return `INSERT INTO medico (createTime, username, senha, crm, cpf, isActive, perfil) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}","${dados.crm}","${dados.cpf}","${dados.isActive}","Medico");`;
    
}

export function queryDeleteMedico(id){
    return `DELETE FROM medico
            WHERE id = ${id}`
}

export function queryGetAllMedicos(){
    return `SELECT * FROM medico`
}

export function queryGetMedicoById(id){
    return `SELECT *
    FROM medico
    WHERE id =${id}`
}