import { Schema, model } from 'mongoose';

const consultaResponseSchema = new Schema({
    idConsulta : { type: Number, required: true },
    paciente : { type: Object, required: true },
    medico : { type: Object, required: true}
 });

export default model('ConsultaResponse', consultaResponseSchema);