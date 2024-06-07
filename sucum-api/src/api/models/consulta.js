import { Schema, model } from 'mongoose';

const consultaSchema = new Schema({
    id: {type: Number},
    createTime: { type: String, required: true },
    tipoConsulta: { type: String, required: true },
    descricaoConsulta: { type: String, required: true },
    estadoConsulta: { type: String, required: true },
    descricaoMotivo: { type: String, required: true },
    dataAgendamento: { type: String, required: true },
    idMedico: { type: Number, required: true },
    idPaciente : { type: Number, required: true }
 });

export default model('Consulta', consultaSchema);