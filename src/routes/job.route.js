import express, { Router } from 'express';
import isAuth from '../middlewares/isAuth.js';

import { getAllJobs, getAllJobsByAdmin, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route('/post').post(isAuth, postJob)
router.route('/get').get(isAuth,getAllJobs)
router.route('/getadminjobs').get(isAuth, getAllJobsByAdmin)
router.route('/get/:id').get(isAuth, getJobById)

export default router;