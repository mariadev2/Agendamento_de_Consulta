export function checkUserExistSupervisorById(id){
    return `SELECT * FROM supervisor WHERE id = "${id}"`
}

export function checkUserExistSupervisor(username){
    return `SELECT COUNT(*) AS count
                FROM supervisor 
                WHERE username = "${username}"`
}

export function queryUpdateSupervisor(dados){
    return `UPDATE supervisor
            SET username = "${dados.username}",
                email = "${dados.email}",
                senha = "${dados.senha}",
                areaSupervisao = "${dados.areaSupervisao}"
            WHERE id = ${dados.id};`;
}

export function createSqlInsertSupervisor(dados) {
    return `INSERT INTO supervisor (createTime, username, senha, 
                                    email, areaSupervisao) 
                        VALUES ("${dados.createTime}","${dados.username}","${dados.senha}","${dados.email}","${dados.areaSupervisao}");`;
    
}

export function queryDeleteSupervisor(id){
    return `DELETE FROM supervisor
            WHERE id = ${id}`
}

export function queryGetAllSupervisors(){
    return `SELECT * FROM supervisor`
}

export function queryGetSupervisorById(id){
    return `SELECT *
    FROM supervisor
    WHERE id =${id}`
}