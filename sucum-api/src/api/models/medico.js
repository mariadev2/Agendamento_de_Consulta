import { Schema, model } from 'mongoose';

const medicoSchema = new Schema({
    id: {type: Number, required: true},
    username: { type: String, required: true },
    senha: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    celular: { type: String, required: true },
    numeroCasa: { type: Number, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    cep: { type: String, required: true },
    createTime : {type: String, required: true},
    crm:  { type: String, required: true },
    especializacao :  { type: String, required: true },
 });

export default model('Medico', medicoSchema);