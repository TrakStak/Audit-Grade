import AWS from "aws-sdk";

const textract = new AWS.Textract({
  region: process.env.AWS_REGION || "ap-southeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function extractTextFromDocument(s3Object) {
  try {
    const params = {
      Document: {
        S3Object: {
          Bucket: process.env.AWS_TEXTRACT_BUCKET,
          Name: s3Object,
        },
      },
      FeatureTypes: ["TABLES", "FORMS"],
    };
    
    const response = await textract.analyzeDocument(params).promise();
    const lines = response.Blocks
      .filter((block) => block.BlockType === "LINE")
      .map((line) => line.Text);
    
    return lines.join("\n");
  } catch (error) {
    console.error("Textract error:", error);
    return null;
  }
}
