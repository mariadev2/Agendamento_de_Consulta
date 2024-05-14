import { Schema, model } from 'mongoose';

const medicoPreSchema = new Schema({
    username: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    createTime : {type: String, required: true},
 });

export default model('MedicoPre', medicoPreSchema);