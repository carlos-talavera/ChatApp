import { User } from "../models/User.js";

// Create user
const createUser = async (req, res) => {

    const { email } = req.body;

    const userExists = await User.findOne({
        where: {
            email
        }
    });

    // Check if the user already exists
    if (userExists) {

        const error = new Error('El usuario ya está registrado');
        return res.status(400).json({ msg: error.message });

    }

    try {

        const user = new User(req.body);
        const savedUser = await user.save();

        return res.status(200).json(savedUser);
        
        
    } catch (err) {

        console.error(err);
        const error = new Error(err);
        return res.status(500).json({ msg: error.message });
        
    }

}

export {
    createUser
}