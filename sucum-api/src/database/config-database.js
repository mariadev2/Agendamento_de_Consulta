import mysql from "mysql"

export default () => mysql.createConnection({
    "host": "127.0.0.1",
    "port": 3306,
    "user": "AndreiDev",
    "password": "nemo123",
    "database": "sucumdb"
})