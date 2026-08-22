const aiRules = {
  development: {
    "E-Commerce": {
      complexity: "Advanced",
      duration: 35,
      team: [
        { role: "Frontend Developer", level: "Senior", salary: 1700 },
        { role: "Backend Developer", level: "Senior", salary: 1600 },
        { role: "UI / UX Designer", level: "Mid-Level", salary: 700 },
        { role: "QA Tester", level: "Junior", salary: 400 },
        { role: "SEO Specialist", level: "Junior", salary: 250 },
      ],
    },

    Website: {
      complexity: "Medium",
      duration: 20,
      team: [
        { role: "Frontend Developer", level: "Mid-Level", salary: 900 },
        { role: "Backend Developer", level: "Mid-Level", salary: 900 },
        { role: "UI Designer", level: "Junior", salary: 400 },
      ],
    },

    Dashboard: {
      complexity: "Medium",
      duration: 25,
      team: [
        { role: "Frontend Developer", level: "Senior", salary: 1200 },
        { role: "Backend Developer", level: "Mid-Level", salary: 900 },
      ],
    },
  },

  design: {
    "Logo Design": {
      complexity: "Easy",
      duration: 5,
      team: [
        { role: "Graphic Designer", level: "Mid-Level", salary: 300 },
      ],
    },
  },

  marketing: {
    SEO: {
      complexity: "Medium",
      duration: 30,
      team: [
        { role: "SEO Specialist", level: "Senior", salary: 900 },
      ],
    },
  },
};

export default aiRules;