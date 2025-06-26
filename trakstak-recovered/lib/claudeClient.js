import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrock = new BedrockRuntimeClient({
  region: "us-east-1", // Claude only supported in us-east-1 via Bedrock
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function callClaude(prompt, options = {}) {
  const payload = {
    prompt,
    max_tokens_to_sample: options.max_tokens || 500,
    temperature: options.temperature || 0.7,
    top_k: options.top_k || 250,
    top_p: options.top_p || 0.999,
    stop_sequences: options.stop || [],
  };

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-v2",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload),
  });

  try {
    const response = await bedrock.send(command);
    const body = await response.body.transformToString();
    const parsed = JSON.parse(body);
    return parsed.completion || parsed.message || parsed;
  } catch (err) {
    console.error("Claude Error:", err);
    throw new Error("Claude failed to respond");
  }
}

export const claudeClient = bedrock;
