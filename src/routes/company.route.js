import express from 'express';

import {getCompany, getCompanyBYID, registerComapny, updateCompany} from '../controllers/company.controller.js'
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.route("/register").post(isAuth, registerComapny),
router.route("/get").get(isAuth, getCompany),
router.route("/update/:id").put(isAuth, updateCompany)
router.route("/get/:id").get(isAuth, getCompanyBYID)

export default router;