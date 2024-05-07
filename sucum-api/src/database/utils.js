
export default function createSqlInsertPaciente(tabela, dados) {
    return sql = `INSERT INTO ${tabela} (createTime, username, password, 
                                        token, dataNascimento, celular, 
                                        cep, numeroCasa, bairro, cidade, email, cpf) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.password}",
                                "${dados.token}","${dados.dataNascimento}","${dados.celular}",
                                "${dados.cep}","${dados.numeroCasa}","${dados.bairro}",
                                "${dados.cidade}","${dados.email}","${dados.cpf}");`;
    
}

export function queryCreatePacienteTable(){
    return  ` CREATE TABLE IF NOT EXISTS paciente (
        id INT AUTO_INCREMENT PRIMARY KEY,
        createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255),
        dataNascimento DATE,
        celular VARCHAR(20),
        cep VARCHAR(10),
        numeroCasa VARCHAR(10),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        email VARCHAR(255),
        cpf VARCHAR(14)
    )`;
}

export function queryCreateSupervisorTable(){
    return `CREATE TABLE IF NOT EXISTS supervisor(  
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time',
        name VARCHAR(255),
        senha VARCHAR(255),
        email VARCHAR(255),
        areaSupervisao VARCHAR(255)
    )`
}

export function queryCreateMedicoTable(){
    return `CREATE TABLE IF NOT EXISTS medico(  
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time',
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
        create_time DATETIME COMMENT 'Create Time',
        tipoConsulta VARCHAR(255),
        descricaoConsulta VARCHAR(255),
        estadoConsulta VARCHAR(255),
        descricaoMotivo VARCHAR(255)
    )`
}