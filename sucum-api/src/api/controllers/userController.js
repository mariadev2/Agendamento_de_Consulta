
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

export default () => {
    const controller = {};
    controller.signUpController = async (req, res) => {
        
        try {
            const { username, password } = req.body;
            const hashedToken = await bcrypt.hash(password, 10);
            const user = new User({ username, password:hashedToken });
            // save database
            // await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    };

    controller.loginController = async (req, res) => {
        try {
            const { username, password } = req.body;

            // const user = await User.findOne({ username });
            // if (!user) {
            //     return res.status(401).json({ error: 'Authentication failed' });
            // }

            //user from data base
            //user mock
            const user = new User({ username: 'test', password: '$2b$10$pNcfQjYvxI4HXSB01dRqt.uM.V3FudYf3uPtNuXX1nknfP8z4ArUu' });
           
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jwt.sign({ userId: '66304d9d03957f8d08d63c51'}, 'your-secret-key', {
                expiresIn: '1h',
            });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    };
  
    return controller;
  }