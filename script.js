// ===== VIEW SWITCHING =====
const views = document.querySelectorAll(".view");

function showView(viewId) {
  views.forEach(v => v.classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");
  window.scrollTo(0, 0);
}

// Nav bar buttons (top nav + "Learn More" link on landing)
document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => {
    showView(btn.dataset.view);
  });
});

// Both "Start" buttons (top nav + hero) go to the form
document.getElementById("startBtn").addEventListener("click", () => {
  showView("view-form");
});
document.getElementById("startBtn2").addEventListener("click", () => {
  showView("view-form");
});

// "Edit My Answers" button on results page
document.getElementById("backToFormBtn").addEventListener("click", () => {
  showView("view-form");
});

// ===== GENERATE ROADMAP BUTTON (real AI call) =====
document.getElementById("generateBtn").addEventListener("click", async () => {
  showView("view-results");
  document.getElementById("resultsContent").innerHTML = "";
  document.getElementById("loadingMsg").classList.remove("hidden");

  const payload = {
    careerGoal: document.getElementById("careerGoal").value,
    skillLevel: document.getElementById("skillLevel").value,
    currentSkills: document.getElementById("currentSkills").value || "None specified",
    studyTime: document.getElementById("studyTime").value,
    duration: document.getElementById("duration").value,
  };

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    document.getElementById("loadingMsg").classList.add("hidden");

    if (data.error) {
      document.getElementById("resultsContent").innerHTML =
        `<p>Something went wrong: ${data.error}</p>`;
      return;
    }

    renderResults(data, payload.careerGoal);
  } catch (err) {
    document.getElementById("loadingMsg").classList.add("hidden");
    document.getElementById("resultsContent").innerHTML =
      "<p>Something went wrong generating your roadmap. Please try again.</p>";
    console.error(err);
  }
});

function renderResults(data, careerGoal) {
  let html = `
    <div class="result-block">
      <h3><i class="fa-solid fa-bullseye"></i> Career Goal</h3>
      <p>${careerGoal}</p>
    </div>

    <div class="result-block">
      <h3><i class="fa-solid fa-magnifying-glass-chart"></i> Skill Gap Analysis</h3>
      <p><strong>Current Skills</strong></p>
      ${data.haveSkills.map(s => `<span class="skill-tag skill-have">✔ ${s}</span>`).join("")}
      <p style="margin-top:14px;"><strong>Missing Skills</strong></p>
      ${data.missingSkills.map(s => `<span class="skill-tag skill-missing">${s}</span>`).join("")}
    </div>

    <div class="result-block">
      <h3><i class="fa-solid fa-map"></i> Personalized Learning Roadmap</h3>
      ${data.roadmap.map(m => `
        <p style="margin-top:10px;"><strong>${m.month}</strong></p>
        <ul>${m.topics.map(t => `<li>${t}</li>`).join("")}</ul>
      `).join("")}
    </div>

    <div class="result-block">
      <h3><i class="fa-solid fa-diagram-project"></i> Recommended Portfolio Projects</h3>
      <ul>
        <li><strong>Beginner:</strong> ${data.projects.beginner}</li>
        <li><strong>Intermediate:</strong> ${data.projects.intermediate}</li>
        <li><strong>Advanced:</strong> ${data.projects.advanced}</li>
      </ul>
    </div>

    <div class="result-block">
      <h3><i class="fa-solid fa-file-lines"></i> Resume Improvement Tips</h3>
      <ul>${data.resumeTips.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>

    <div class="result-block">
      <h3><i class="fa-solid fa-comments"></i> Interview Preparation</h3>
      <ul>${data.interviewTips.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>
  `;

  document.getElementById("resultsContent").innerHTML = html;
}