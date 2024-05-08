require('dotenv').config()

export default (token)=>{
    const secretKey = process.env.SECRET_KEY;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err); // JWT verification failed
            } else {
                const now = Date.now() / 1000;
                if (decoded.exp <= now) {
                    reject(new Error('Token has expired')); // JWT has expired
                } else {
                    resolve(decoded); // JWT is valid
                }
            }
        });
    });
}