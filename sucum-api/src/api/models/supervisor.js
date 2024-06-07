import { Schema, model} from 'mongoose';

const supervisorSchema = new Schema({
    id: {type: Number, required: true},
    username: { type: String, unique: true, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    areaSupervisao: { type: String, required: true },
    createTime : {type: String, required: true}
 });

export default model('Supervisor', supervisorSchema);