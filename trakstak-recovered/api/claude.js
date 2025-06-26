import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, context } = req.body;
    
    const command = new InvokeModelCommand({
      modelId: process.env.CLAUDE_MODEL_ID,
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
      }),
      contentType: "application/json",
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    res.status(200).json({ 
      response: responseBody.completion,
      context: context 
    });
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
