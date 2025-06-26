export async function draftAnnouncementWithClaude(prompt) {
  const res = await fetch('/api/claude-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `As a compliance communications assistant, generate a short announcement with a title and message. Be clear, helpful, and professional. Input: ${prompt}`,
    }),
  });
  
  const data = await res.json();
  const lines = data.summary?.split('\n').filter(Boolean) || [];
  const title = lines[0] || 'Announcement';
  const message = lines.slice(1).join(' ') || '';
  
  return { title, message };
}
