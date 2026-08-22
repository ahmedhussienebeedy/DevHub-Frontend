import express from "express";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import {
  applyToProject,
  getProjectApplications,
  updateApplicationStatus,
  getMyApplications,
} from "../controllers/applicationController.js";

const router = express.Router();


// ===============================
// Freelancer Routes
// ===============================


// Freelancer get his applications
router.get(
  "/my-applications",
  protect,
  authorize("freelancer"),
  getMyApplications
);


// Freelancer apply to project
router.post(
  "/:projectId",
  protect,
  authorize("freelancer"),
  applyToProject
);



// ===============================
// Client Routes
// ===============================


// Client get project applicants
router.get(
  "/project/:projectId",
  protect,
  authorize("client"),
  getProjectApplications
);


// Client accept / reject application
router.patch(
  "/:id/status",
  protect,
  authorize("client"),
  updateApplicationStatus
);



export default router;