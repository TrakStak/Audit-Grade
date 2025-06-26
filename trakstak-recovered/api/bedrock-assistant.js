import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, type = 'compliance' } = req.body;
    
    const systemPrompt = `You are Sandy, the AI assistant for TrakStak. You help care providers with compliance, NDIS requirements, and audit preparation. Always be helpful, accurate, and focus on practical solutions.`;
    
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: message
        }]
      }),
      contentType: "application/json",
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    res.status(200).json({ 
      response: responseBody.content[0].text,
      type: type,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Bedrock Error:', error);
    res.status(500).json({ error: 'Sandy is temporarily unavailable' });
  }
}
