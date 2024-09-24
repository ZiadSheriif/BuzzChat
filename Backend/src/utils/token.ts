import jwt from 'jsonwebtoken';

const createToken = async (user: any) => {
    const token = await jwt.sign({ userId: user.id }, 'JWKACEK', { expiresIn: '1h' });

    return token;
};


const verifyToken = async (token: any) => {
    const decodedToken = await jwt.verify(token, 'JWKACEK');

    return decodedToken;
}



const secret = process.env.JWT_SECRET || 'default_secret_key';

const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
    return jwt.sign(payload, secret, { expiresIn });
};


export { createToken, verifyToken, generateToken };
