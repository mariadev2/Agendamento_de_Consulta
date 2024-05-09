import { Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    id: {type: Number, required: true},
    password: { type: String, required: true },
    token: { type: String, required: true },
 });

export default model('User', userSchema);