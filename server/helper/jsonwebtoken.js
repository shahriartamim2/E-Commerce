import jwt from 'jsonwebtoken';

const generateToken = (payload, securityKey, expiresIn) => {
    const token = jwt.sign(payload, securityKey, {expiresIn} );
    return token;
};

export default generateToken;
