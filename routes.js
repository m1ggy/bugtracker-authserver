import { user } from './models/userModel.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
dotenv.config();
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (username == null || password == null)
    return res
      .status(400)
      .json({ message: 'Please provide username and / or password' });

  const existingUser = await user.find({ username }).exec();

  if (existingUser.length > 0)
    return res.status(400).json({ message: 'User already exists' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      username,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: 'error: ', err });
  }
  return res.status(201).json({ message: 'successfully created user.' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null)
    return res
      .status(400)
      .json({ message: 'Please provide username and / or password' });

  const currentUser = await user.findOne({ username }).exec();

  if (currentUser == null || currentUser.length === 0)
    return res.status(400).json({ message: 'User does not exist' });

  if (await bcrypt.compare(password, currentUser.password)) {
    console.log(process.env.REFRESH_TOKEN_SECRET);
    const refreshTokenCookie = generateRefreshToken(username);
    res.cookie('refreshTokenCookie', refreshTokenCookie, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    });

    return res.status(201).json({ message: 'Logged in!' });
  } else return res.status(401).json({ message: 'Incorrect Password' });
});

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12h',
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7 days',
  });
}

export default router;
