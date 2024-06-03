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
            perfil VARCHAR (255),
            sexo VARCHAR (255),
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
            perfil VARCHAR (255),
            sexo VARCHAR (255),
            cpf VARCHAR (255),
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
            perfil VARCHAR (255),
            genero VARCHAR (255),
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
            dataAgendamento VARCHAR(255),
            idPaciente INT,
            idMedico INT
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

export function checkUserExistLogin(data) {
    return `SELECT id, username, senha, cpf, sexo, perfil FROM medico WHERE username = '${data}' OR cpf = '${data}'
            UNION
            SELECT id, username, senha, cpf, sexo, perfil FROM paciente WHERE username = '${data}' OR cpf = '${data}'
            UNION
            SELECT id, username, senha, cpf, sexo, perfil FROM supervisor WHERE username = '${data}' OR cpf = '${data}'
            `
}
