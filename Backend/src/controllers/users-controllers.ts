const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const User = require('../models/user');

const { createToken } = require('../utils/token');


const login = async (req: any, res: any, next: any) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }


        let token = await createToken(user);
        res.status(200).json({ token: token, userId: user.id, email: user.email, username: user.username, image: user.image });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const signup = async (req: any, res: any, next: any) => {
    const { username, email, password, image } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ username, email, password: hashedPassword, image: image || 'https://www.w3schools.com/howto/img_avatar.png' });

        await newUser.save();

        let token = await createToken(newUser);
        res.status(201).json({ token: token, userId: newUser.id, username: newUser.username, image: newUser.image });
        return next();

    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const guest = async (req: any, res: any, next: any) => {
    const { username, image } = req.body;

    const newRandomUser = 'Guest' + Math.floor(Math.random() * 100000);
    const randomAvatar = 'https://www.w3schools.com/howto/img_avatar.png';


    if (!username && !image) {
        return res.status(400).json({ message: 'Invalid input' });
    }


    const newGuest = new User({ username: newRandomUser, image: image || randomAvatar });

    try {
        await newGuest.save();
    } catch (err) {
        res.status(500).json({ message: 'Guest user could not be created' });
        console.log(err);
        return;
    }

    res.status(201).json({ userId: newGuest._id, username: newGuest.username, image: newGuest.image });

}


module.exports = { login, signup, guest };