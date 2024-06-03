import { Schema, model } from 'mongoose';

const medicoPreSchema = new Schema({
    username: { type: String, required: true },
    senha: { type: String, required: true },
    crm: { type: String, required: true },
    cpf: { type: String, required: true },
    isActive : {type: String, required: true},
    createTime : {type: String, required: true},
 });

export default model('MedicoPre', medicoPreSchema);