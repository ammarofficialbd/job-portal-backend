import express from 'express';

import {login, register, logOut, updateProfile} from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.route("/register").post(register),
router.route("/login").post(login),
router.route("/profile/update").post(isAuth,updateProfile)
router.route("/logout").get(logOut)

export default router;