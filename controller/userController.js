const User=require('../model/userModel')


exports.createUser = async (req, res) => {
    try {

        const newUser = await User.create({
            userName: req.body.userName,
            email: req.body.email
        });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};





