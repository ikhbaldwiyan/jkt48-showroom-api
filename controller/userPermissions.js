const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      user_id: req.body.user_id,
      name: req.body.name,
      can_3_room: req.body.can_3_room || false,
      can_4_room: req.body.can_4_room || false,
      can_farming_page: req.body.can_farming_page || false,
      can_farming_detail: req.body.can_farming_detail || false,
      can_farming_multi: req.body.can_farming_multi || false,
    });


    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'User ID already taken' });
    } 
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get user permissions by user ID
exports.getUserPermissions = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findOne({ user_id: userId });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update user permissions by user ID
exports.updateUserPermissions = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updatedUserPermissions = {
      can_3_room: req.body.can_3_room,
      can_4_room: req.body.can_4_room,
      can_farming_page: req.body.can_farming_page,
      can_farming_detail: req.body.can_farming_detail,
      can_farming_multi: req.body.can_farming_multi,
    };

    const result = await User.updateOne({ user_id: userId }, { $set: updatedUserPermissions });

    if (result.matchedCount > 0) {
      res.json({ message: 'User permissions updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user permissions:', error);
    res.status(500).json({ error: 'Failed to update user permissions' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Delete a user by user_id
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOneAndDelete({ user_id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
