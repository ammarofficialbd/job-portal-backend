import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { applyJob, getApplicants, getAppliedJob, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route("/status/:id/update").post(isAuth, updateStatus),
router.route("/get").get(isAuth, getAppliedJob),
router.route("/:id/applicants").get(isAuth, getApplicants)
router.route("/apply/:id").get(isAuth, applyJob)

export default router;