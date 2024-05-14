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
                cidade = "${dados.cidade}",
                cpf = "${dados.cpf}",
                crm = "${dados.crm}",
                especializacao = "${dados.especializacao}"
            WHERE id = ${dados.id};`;
}

export function createSqlInsertMedico(dados) {
    return `INSERT INTO medico (createTime, username, senha, 
                                    email, areaSupervisao) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}","${dados.email}","${dados.areaSupervisao}");`;
    
}

export function createSqlInsertPreMedico(dados) {
    return `INSERT INTO medico (createTime, username, senha, email) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}","${dados.email}");`;
    
}

export function queryDeleteMedico(id){
    return `DELETE FROM medico
            WHERE id = ${id}`
}

export function queryGetAllMedicos(){
    return `SELECT * FROM medico`
}