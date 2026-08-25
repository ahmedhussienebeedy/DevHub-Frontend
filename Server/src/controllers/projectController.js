import Project from "../models/Project.js";
import Application from "../models/Application.js";
import Payment from "../models/Payment.js";

// ===============================
// Create Project
// ===============================
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      client: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Projects
// ===============================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get My Projects
// ===============================
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      client: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Project
// ===============================
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "client",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Project
// ===============================
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Project
// ===============================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await project.deleteOne();

    await Application.deleteMany({
      project: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Open Projects
// ===============================
export const getOpenProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      status: "open",
    })
      .populate("client", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Work (Freelancer)
// ======================================
export const getMyWork = async (req, res) => {
  try {
    const projects = await Project.find({
      freelancer: req.user.id,
      status: "in-progress",
    })
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    // ==========================
    // Total Earnings
    // ==========================
    const payments = await Payment.find({
      freelancer: req.user.id,
      status: {
        $in: ["paid", "released"],
      },
    });

    const totalEarnings = payments.reduce((total, payment) => {
      const recipient = payment.recipients?.find(
        (item) => item.freelancer.toString() === req.user.id
      );

      return total + (recipient?.amount ?? payment.amount);
    }, 0);

    res.status(200).json({
      success: true,
      count: projects.length,
      totalEarnings,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};