export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { careerGoal, skillLevel, currentSkills, studyTime, duration } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  const systemPrompt = `You are an expert career mentor.

Based on the user's career goal, current skill level, existing skills, available study time, and learning duration, generate a personalized response with these EXACT sections, and nothing else:

1. A skill gap analysis: list of "haveSkills" (skills the user already has, cleaned up) and "missingSkills" (skills they need to learn for this career goal).
2. A learning roadmap broken down by month (e.g. "Month 1", "Month 2"...), each with 2-4 bullet point topics to learn, matching the total learning duration.
3. Three recommended portfolio projects: one beginner, one intermediate, one advanced.
4. Resume improvement tips: 4-6 bullet points.
5. Interview preparation tips: 4-6 bullet points covering technical topics, soft skills, and coding practice.

Respond ONLY with valid JSON in this exact structure, no markdown formatting, no backticks, no extra text:

{
  "haveSkills": ["..."],
  "missingSkills": ["..."],
  "roadmap": [ { "month": "Month 1", "topics": ["..."] } ],
  "projects": { "beginner": "...", "intermediate": "...", "advanced": "..." },
  "resumeTips": ["..."],
  "interviewTips": ["..."]
}`;

  const userPrompt = `Career Goal: ${careerGoal}
Current Skill Level: ${skillLevel}
Current Skills: ${currentSkills}
Available Study Time: ${studyTime}
Learning Duration: ${duration}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
        }),
      }
    );

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);
    res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
}