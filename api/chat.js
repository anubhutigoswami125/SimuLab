export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed" }); }
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "AI is not configured. Add OPENAI_API_KEY to the deployment environment." });
  const { message, context = "", history = [] } = req.body || {};
  if (typeof message !== "string" || !message.trim() || message.length > 2000) return res.status(400).json({ error: "Provide a message of up to 2000 characters." });
  const safeHistory = Array.isArray(history) ? history.filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string").slice(-8).map(m => ({ role: m.role, content: m.content.slice(0, 2000) })) : [];
  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + process.env.OPENAI_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.4, max_tokens: 700,
        messages: [
          { role: "system", content: "You are LabMate AI, a careful educational assistant inside SimuLab, a virtual biotechnology laboratory for learners. Explain concepts clearly, distinguish simulated data from real measurements, never fabricate observations or claim a simulation proves a real-world result. Give safe educational guidance and flag that wet-lab work requires trained supervision, approved protocols and institutional safety rules. Current workspace context: " + String(context).slice(0, 1500) },
          ...safeHistory, { role: "user", content: message.trim() }
        ]
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) { console.error("AI provider error", upstream.status, data && data.error && data.error.type || "unknown"); return res.status(502).json({ error: "The AI provider could not complete the request." }); }
    const reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!reply) return res.status(502).json({ error: "The AI provider returned an empty response." });
    return res.status(200).json({ reply });
  } catch (error) { console.error("AI request failed", error && error.message || "unknown"); return res.status(500).json({ error: "Unable to reach the AI provider right now." }); }
}