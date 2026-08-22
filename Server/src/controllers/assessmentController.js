import AssessmentQuestion from "../models/AssessmentQuestion.js";
import AssessmentResult from "../models/AssessmentResult.js";
import FreelancerProfile from "../models/FreelancerProfile.js";


// =============================
// Get Categories
// =============================
export const getCategories = async (req, res) => {
  try {
    const categories = [
      "Web Development",
      "Mobile Development",
      "UI / UX",
      "Graphic Design",
      "Motion Graphics",
      "Video Editing",
      "Digital Marketing",
      "SEO",
      "Media Buying",
      "Content Creation",
      "Cyber Security",
      "AI",
      "Data Analysis",
      "Business",
      "Translation",
      "Photography",
      "Voice Over",
      "3D Design",
    ];

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// Get Specializations
// =============================
export const getSpecializations = async (req, res) => {
  try {
    const { category } = req.params;

    const map = {
      "Web Development": [
        "Frontend",
        "Backend",
        "Full Stack",
        "WordPress",
        "Shopify",
      ],

      "Mobile Development": [
        "Flutter",
        "React Native",
        "Android",
        "iOS",
      ],

      "UI / UX": [
        "UI Design",
        "UX Design",
      ],

      "Graphic Design": [
        "Branding",
        "Logo Design",
        "Social Media",
      ],

      "Motion Graphics": [
        "After Effects",
        "2D Animation",
        "3D Animation",
      ],

      "Video Editing": [
        "Premiere",
        "DaVinci",
      ],

      "Digital Marketing": [
        "Meta Ads",
        "Google Ads",
        "TikTok Ads",
      ],

      SEO: [
        "Technical SEO",
        "On Page",
        "Off Page",
      ],

      "Media Buying": [
        "Meta",
        "Google",
      ],

      AI: [
        "Prompt Engineering",
        "Automation",
      ],

      "Cyber Security": [
        "PenTesting",
        "Networking",
      ],

      "Data Analysis": [
        "Power BI",
        "Python",
        "SQL",
      ],
    };

    res.json({
      success: true,
      specializations: map[category] || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// Get Questions
// =============================
export const getQuestions = async (req, res) => {
  try {
    const { category, specialization } = req.query;

    const questions = await AssessmentQuestion.find({
      category,
      specialization,
    }).select("-answer");

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// Submit Assessment
// =============================
export const submitAssessment = async (req, res) => {
  try {
    const {
      category,
      specialization,
      answers,
    } = req.body;

    const questions = await AssessmentQuestion.find({
      category,
      specialization,
    });

    let score = 0;

    let correct = 0;

    questions.forEach((q) => {
      const answer = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      if (answer && answer.selected === q.answer) {
        score += q.points;
        correct++;
      }
    });

    const percentage = Math.round(
      (correct / questions.length) * 100
    );

    let level = "Junior";

    if (percentage >= 90)
      level = "Expert";
    else if (percentage >= 70)
      level = "Senior";
    else if (percentage >= 40)
      level = "Mid-Level";

    const result = await AssessmentResult.create({
      freelancer: req.user.id,
      category,
      specialization,
      score,
      percentage,
      correctAnswers: correct,
      totalQuestions: questions.length,
      level,
      verified: true,
    });

    await FreelancerProfile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        category,
        specialization,
        aiScore: percentage,
        verified: true,
        level,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// Get Result
// =============================
export const getMyResult = async (req, res) => {
  try {
    const result = await AssessmentResult.findOne({
      freelancer: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};