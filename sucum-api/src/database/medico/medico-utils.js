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
            SET username = "${dados.username}",
                senha = "${dados.senha}",
                email = "${dados.email}",
                dataNascimento = "${dados.dataNascimento}",
                celular = "${dados.celular}",
                cep = "${dados.cep}",
                numeroCasa = "${dados.numeroCasa}",
                bairro = "${dados.bairro}",
                genero = "${dados.genero},
                cidade = "${dados.cidade}",
                cpf = "${dados.cpf}",
                crm = "${dados.crm}",
                especializacao = "${dados.especializacao}"
            WHERE id = ${dados.id};`;
}


export function createSqlInsertPreMedico(dados) {
    return `INSERT INTO medico (createTime, username, senha, email, perfil) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}","${dados.email}", "Medico");`;
    
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