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
                genero = "${dados.genero},
                cpf = "${dados.cpf}"
            WHERE id = ${dados.id};`;
}

export function createSqlInsertPaciente(dados) {
    return `INSERT INTO paciente (createTime, username, senha, 
                                        dataNascimento, celular, 
                                        cep, numeroCasa, bairro, cidade, email, cpf, perfil, genero) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}",
                                "${dados.dataNascimento}","${dados.celular}",
                                "${dados.cep}","${dados.numeroCasa}","${dados.bairro}",
                                "${dados.cidade}","${dados.email}","${dados.cpf}","Paciente", "${dados.genero}");`;
    
}

export function queryDeletePaciente(id){
    return `DELETE FROM paciente
            WHERE id = ${id}`
}

export function queryGetAllPacientes(){
    return `SELECT * FROM paciente`
}

export function queryGetPacienteById(id){
    return `SELECT *
    FROM paciente
    WHERE id =${id}`
}

export function queryGetPacienteByUsername(username){
    return `SELECT *
    FROM paciente
    WHERE username = "${username}"`
}