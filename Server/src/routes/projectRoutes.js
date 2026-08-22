import express from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getMyProjects,
  getOpenProjects,
  getMyWork,
} from "../controllers/projectController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();


// ===============================
// Public Routes
// ===============================

router.get("/", getProjects);

router.get("/open/all", getOpenProjects);


// ===============================
// Freelancer Routes
// ===============================

router.get(
  "/my-work",
  protect,
  authorize("freelancer"),
  getMyWork
);


// ===============================
// Client Routes
// ===============================

router.get(
  "/my-projects",
  protect,
  authorize("client"),
  getMyProjects
);


router.post(
  "/",
  protect,
  authorize("client"),
  createProject
);


router.put(
  "/:id",
  protect,
  authorize("client"),
  updateProject
);


router.delete(
  "/:id",
  protect,
  authorize("client"),
  deleteProject
);


// ===============================
// Single Project
// لازم يكون في الآخر
// ===============================

router.get("/:id", getProject);



export default router;