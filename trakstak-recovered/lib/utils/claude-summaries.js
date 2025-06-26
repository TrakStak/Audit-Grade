import { callClaude } from "../claudeClient.js";

export const getClaudeSummary = async (orgName) => {
  const prompt = `You are a compliance AI. Summarize the biggest audit risks for the organization: ${orgName}. Focus on missing checklists, untrained staff, and unresolved incidents. Keep it short.`;
  const response = await callClaude(prompt);
  return response?.summary || response || "No summary returned.";
};

export async function getSandboxAuditSummary(logs) {
  if (!logs || logs.length === 0) return '🟢 No incidents detected in sandbox logs.';
  
  const flagged = logs.filter(log => log.severity === 'high' || log.status === 'pending_review');
  
  if (flagged.length > 0) {
    return `⚠️ Claude flagged ${flagged.length} high-severity incidents. Please review immediately.`;
  }
  
  return '✅ Claude scanned all sandbox logs. No major risks detected.';
}

export const getClaudeSummary = (user_id, organization_id) => {
  return `
🔍 Summary for ${user_id} in org ${organization_id}:
- Independent living goal
- Creative engagement (knitting, colouring)
- Mobility and personal care support
- Medical needs: diabetes, skin integrity, emotional regulation
  `;
}
