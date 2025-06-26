export async function sendToMailerLite(email) {
  const res = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
    },
    body: JSON.stringify({
      email,
      groups: ['TrakStak Leads'], // optional tag group
    }),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error('MailerLite failed: ' + errorText);
  }
  
  return await res.json();
}
