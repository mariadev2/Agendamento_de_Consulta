export function checkUserExistPacienteById(id){
    return `SELECT * FROM paciente WHERE id = "${id}"`
}

export function checkUserExistPaciente(username){
    return `SELECT COUNT(*) AS count
                FROM paciente 
                WHERE username = "${username}"`
}

export function queryUpdatePaciente(dados){
    return `UPDATE paciente
            SET username = "${dados.username}",
                email = "${dados.email}",
                dataNascimento = "${dados.dataNascimento}",
                celular = "${dados.celular}",
                cep = "${dados.cep}",
                numeroCasa = "${dados.numeroCasa}",
                bairro = "${dados.bairro}",
                cidade = "${dados.cidade}",
                cpf = "${dados.cpf}"
            WHERE id = ${dados.id};`;
}

export function createSqlInsertPaciente(dados) {
    return `INSERT INTO paciente (createTime, username, senha, 
                                        token, dataNascimento, celular, 
                                        cep, numeroCasa, bairro, cidade, email, cpf) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}",
                                "${dados.token}","${dados.dataNascimento}","${dados.celular}",
                                "${dados.cep}","${dados.numeroCasa}","${dados.bairro}",
                                "${dados.cidade}","${dados.email}","${dados.cpf}");`;
    
}

export function queryDeletePaciente(id){
    return `DELETE FROM paciente
            WHERE id = ${id}`
}

export function queryGetAllPacientes(){
    return `SELECT * FROM paciente`
}