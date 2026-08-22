import pricing from "./pricing";
import positions from "./positions";
import keywords from "./keywords";

function detectFeatures(description = "") {
  const text = description.toLowerCase();

  const features = [];

  Object.entries(keywords).forEach(([feature, words]) => {
    if (words.some((word) => text.includes(word.toLowerCase()))) {
      features.push(feature);
    }
  });

  return features;
}

export function analyzeProject(category, type, description = "") {

  const baseTeam = positions[category]?.[type] || [];

  const finalTeam = [...baseTeam];

  const features = detectFeatures(description);

  // =========================
  // Extra Positions
  // =========================

  if (features.includes("chat")) {
    finalTeam.push({
      role: "Realtime Developer",
      level: "Mid",
    });
  }

  if (features.includes("payment")) {
    finalTeam.push({
      role: "Payment Specialist",
      level: "Mid",
    });
  }

  if (features.includes("ai")) {
    finalTeam.push({
      role: "AI Engineer",
      level: "Senior",
    });
  }

  if (features.includes("dashboard")) {
    finalTeam.push({
      role: "UI / UX Designer",
      level: "Mid",
    });
  }

  if (features.includes("mobile")) {
    finalTeam.push({
      role: "Mobile Developer",
      level: "Senior",
    });
  }

  // إزالة التكرار لو نفس الـ Role اتضاف مرتين
  const uniqueTeam = [];

  finalTeam.forEach((member) => {
   const exists = uniqueTeam.find(
  (item) => item.role === member.role
);

if (!exists) {
  uniqueTeam.push(member);
} else {
  const levels = {
    Junior: 1,
    Mid: 2,
    Senior: 3,
  };

  if (levels[member.level] > levels[exists.level]) {
    exists.level = member.level;
  }
}
  });

  // =========================
  // Budget
  // =========================

  let budget = 0;

  const team = uniqueTeam.map((member) => {

  const salary = pricing[member.level] || 0;

  budget += salary;

  return {

    id: crypto.randomUUID(),

    role: member.role,

    level: member.level,

    salary,

    applicants: [],

    freelancer: null,

    status: "waiting",

  };

});
  // =========================
  // Complexity
  // =========================

  let complexity = "Easy";

  if (team.length >= 4) complexity = "Medium";

  if (team.length >= 6) complexity = "Hard";

  if (team.length >= 8) complexity = "Enterprise";

  // =========================
  // Duration
  // =========================

  let duration = team.length * 10;

if (complexity === "Hard") {
  duration += 20;
}

if (complexity === "Enterprise") {
  duration += 40;
}

  // =========================
  // Match Score
  // =========================

  let match = 92;

match += features.length;

if (team.length >= 5) {
  match += 2;
}

if (team.length >= 8) {
  match += 2;
}

match = Math.min(match, 99);

 return {
  features,
  team,
 budget,
  duration,
  complexity,
  match,
  positions: team.length,
};
}