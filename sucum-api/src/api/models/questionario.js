import { Schema, model } from 'mongoose';
const questionarioSchema = new Schema({
 create_time: { type: String, required: true },
 problemaSaude:  { type: String, required: true },
 usoMedicamento: { type: String, required: true },
 alergia: { type: String, required: true }
 
 });
export default model('Questionario', questionarioSchema);