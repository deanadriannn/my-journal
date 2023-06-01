import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const role = user.role
    const isPremium = user.isPremium

    const token = createToken(user._id);

    res.status(200).json({ username, token, role, isPremium })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.signup(username, password, role);
    const isPremium = user.isPremium

    const token = createToken(user._id);

    res.status(200).json({ username, token, role, isPremium })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}