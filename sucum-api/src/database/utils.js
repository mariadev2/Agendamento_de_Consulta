export function queryCreatePacienteTable(){
    return  `CREATE TABLE IF NOT EXISTS paciente (
        id INT AUTO_INCREMENT PRIMARY KEY,
        createTime VARCHAR(255),
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        dataNascimento DATE,
        celular VARCHAR(20),
        cep VARCHAR(10),
        numeroCasa VARCHAR(10),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        email VARCHAR(255),
        cpf VARCHAR(14),
        idQuestionario INT
    )`;
}

export function queryCreateSupervisorTable(){
    return `CREATE TABLE IF NOT EXISTS supervisor(  
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        createTime VARCHAR(255),
        name VARCHAR(255),
        senha VARCHAR(255),
        email VARCHAR(255),
        areaSupervisao VARCHAR(255)
    )`
}

export function queryCreateMedicoTable(){
    return `CREATE TABLE IF NOT EXISTS medico(  
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        createTime VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        token VARCHAR(255),
        dataNascimento VARCHAR(255),
        celular VARCHAR(255),
        cep VARCHAR(255),
        numeroCasa VARCHAR(255),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        email VARCHAR(255),
        cpf VARCHAR(255),
        crm VARCHAR(255),
        especializacao VARCHAR(255)
    )`
}

export function queryCreateConsultaTable() {
    return `CREATE TABLE IF NOT EXISTS consulta(  
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        createTime VARCHAR(255),
        tipoConsulta VARCHAR(255),
        descricaoConsulta VARCHAR(255),
        estadoConsulta VARCHAR(255),
        descricaoMotivo VARCHAR(255),
        idPaciente int,
        idMedico int,
        FOREIGN KEY (idPaciente) REFERENCES paciente(id),
        FOREIGN KEY (idMedico) REFERENCES medico(id)
    )`
}

export function queryCreateQuestionarioTable(){
    return `CREATE TABLE IF NOT EXISTS questionario(  
        idPaciente int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        createTime VARCHAR(255),
        problemaSaude VARCHAR(255),
        usoMedicamento VARCHAR(255),
        alergia VARCHAR(255)
    )`
}

export function checkUserExistMedico(username){
    return `SELECT COUNT(*)
    FROM medico
    WHERE ${username}
    )`
}

export function checkUserExistSupervisor(username){
    return `SELECT COUNT(*)
    FROM supervisor
    WHERE ${username}
    )`
}

export function checkUserExistLogin(username) {
    return `SELECT id, username, senha FROM medico WHERE username = '${username}'
            UNION
            SELECT id, username, senha FROM paciente WHERE username = '${username}'
            UNION
            SELECT id, username, senha FROM supervisor WHERE username = '${username}'
            `
}
