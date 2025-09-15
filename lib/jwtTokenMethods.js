const jwt = require('jsonwebtoken');


const JWT_SECRET = `${process.env.JWT_SECRET}`;

const createJWT = (userId, userEmail) => {
    const token = jwt.sign({
        uid: userId,
        email: userEmail,
    },
        JWT_SECRET,
        { expiresIn: "10d" }
    );

    return token;
}

const authenticateJWT = (token) => {

    let isVerified = false;
    let user = undefined;

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            isVerified = false;

        } else {
            isVerified = true;
        }
    });

    if(isVerified){
        user = decodeJWT(token);
    }

    return { isVerified, user };
}

const decodeJWT = (token) => {
    return jwt.decode(token);
}

module.exports = { createJWT, authenticateJWT };