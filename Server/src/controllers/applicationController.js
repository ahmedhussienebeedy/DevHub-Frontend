
import Application from "../models/Application.js";
import Project from "../models/Project.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket/socket.js";

// ======================================
// Apply To Project (Freelancer)
// ======================================
export const applyToProject = async (req, res) => {
  try {
    const {
      positionId,
      positionRole,
      experienceLevel,
      coverLetter,
      price,
      deliveryTime,
    } = req.body;

    // ===============================
    // Validate Required Fields
    // ===============================
    if (
      !positionId ||
      !positionRole ||
      !experienceLevel ||
      !coverLetter ||
      price === undefined ||
      !deliveryTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All application fields are required",
      });
    }

    // ===============================
    // Find Project
    // ===============================
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // ===============================
    // Project Must Be Open
    // ===============================
    if (project.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This project is no longer accepting applications",
      });
    }

    // ===============================
    // Find Position
    // ===============================
    const position = project.team.find(
      (member) => member.id === positionId
    );

    if (!position) {
      return res.status(404).json({
        success: false,
        message: "Position not found in this project",
      });
    }

    // ===============================
    // Make Sure Role Matches
    // ===============================
    if (position.role !== positionRole) {
      return res.status(400).json({
        success: false,
        message: "Invalid position role",
      });
    }

    // ===============================
    // Check Position Status
    // ===============================
    if (position.status !== "waiting") {
      return res.status(400).json({
        success: false,
        message: "This position is no longer available",
      });
    }

    // ===============================
    // Check Duplicate Application
    // ===============================
    const alreadyApplied = await Application.findOne({
      project: project._id,
      freelancer: req.user.id,
      positionId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You already applied to this position",
      });
    }

    // ===============================
    // Create Application
    // ===============================
    const application = await Application.create({
      project: project._id,
      freelancer: req.user.id,
      positionId,
      positionRole,
      experienceLevel,
      coverLetter,
      price,
      deliveryTime,
    });

    // ===============================
    // Add Freelancer To Applicants
    // ===============================
    const teamPosition = project.team.find(
      (member) => member.id === positionId
    );

    if (teamPosition) {
      if (!teamPosition.applicants.includes(req.user.id)) {
        teamPosition.applicants.push(req.user.id);
      }
    }

    await project.save();

    // ===============================
    // Notification To Client
    // ===============================
    const notification = await Notification.create({
      user: project.client,
      sender: req.user.id,
      project: project._id,
      type: "application",
      title: "New Application",
      body: `${req.user.name} applied for ${position.role} on your project "${project.title}".`,
    });

    await notification.populate("sender", "name");
    await notification.populate("project", "title");

    sendNotification(project.client, notification);

    // ===============================
    // Response
    // ===============================
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    // Duplicate MongoDB index
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already applied to this position",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Project Applications (Client)
// ======================================
export const getProjectApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      project: req.params.projectId,
    })
      .populate("freelancer", "name email")
      .populate("project", "title");

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Applications (Freelancer)
// ======================================
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.user.id,
    })
      .populate("project", "title budget category projectType status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Application Status (Client)
// ======================================
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ===============================
    // Validate Status
    // ===============================
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // ===============================
    // Find Application
    // ===============================
    const application = await Application.findById(req.params.id)
      .populate("project")
      .populate("freelancer", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ===============================
    // Check Project Owner
    // ===============================
    if (application.project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    // ===============================
    // Prevent Updating Final Status
    // ===============================
    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Application has already been processed",
      });
    }

    // ===============================
    // Accepted
    // ===============================
    if (status === "accepted") {
      const project = application.project;

      const position = project.team.find(
        (member) => member.id === application.positionId
      );

      if (!position) {
        return res.status(404).json({
          success: false,
          message: "Position not found",
        });
      }

      if (position.status !== "waiting") {
        return res.status(400).json({
          success: false,
          message: "This position has already been assigned",
        });
      }

      // Assign freelancer to position
      position.freelancer = application.freelancer._id;
      position.status = "assigned";

      // Accept application
      application.status = "accepted";

      // Save project
      await project.save();

      // Save application
      await application.save();

      // Reject other applications for same position
      await Application.updateMany(
        {
          project: project._id,
          positionId: application.positionId,
          _id: { $ne: application._id },
          status: "pending",
        },
        {
          status: "rejected",
        }
      );

      // ===============================
      // Notification Freelancer
      // ===============================
      const notification = await Notification.create({
        user: application.freelancer._id,
        sender: req.user.id,
        project: project._id,
        type: "accepted",
        title: "Application Accepted 🎉",
        body: `Your application for the ${application.positionRole} position on "${project.title}" has been accepted.`,
      });

      await notification.populate("sender", "name");
      await notification.populate("project", "title");

      sendNotification(application.freelancer._id, notification);
    }

    // ===============================
    // Rejected
    // ===============================
    if (status === "rejected") {
      application.status = "rejected";

      await application.save();

      const notification = await Notification.create({
        user: application.freelancer._id,
        sender: req.user.id,
        project: application.project._id,
        type: "rejected",
        title: "Application Rejected",
        body: `Your application for the ${application.positionRole} position on "${application.project.title}" has been rejected.`,
      });

      await notification.populate("sender", "name");
      await notification.populate("project", "title");

      sendNotification(application.freelancer._id, notification);
    }

    // ===============================
    // Response
    // ===============================
    return res.status(200).json({
      success: true,
      message: `Application ${status}`,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

